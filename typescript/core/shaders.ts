export const vsSource = `#version 300 es
      in vec4 a_position;
      in vec2 a_texcoord;
      in vec3 a_normal;
      in vec3 a_tangent;
      uniform mat4 u_matrix;
      uniform mat4 u_model;
      out vec2 v_texcoord;
      out vec3 v_normal;
      out vec3 v_tangent;
      out vec3 v_worldPos;
      void main() {
        gl_Position = u_matrix * a_position;
        v_texcoord = a_texcoord;
        v_worldPos = (u_model * a_position).xyz;
        v_normal = mat3(u_model) * a_normal;
        v_tangent = mat3(u_model) * a_tangent;
      }`;

export function buildFragmentSource(tier = 1, precision = 'highp'): string {
  return `#version 300 es
      precision ${precision} float;
      #define TIER ${tier}
      in vec2 v_texcoord;
      in vec3 v_normal;
      in vec3 v_tangent;
      in vec3 v_worldPos;

      uniform sampler2D u_diffuseMap;
      uniform sampler2D u_normalMap;
      uniform sampler2D u_roughnessMap;

      uniform float u_time;
      uniform float u_wiggleSpeed;
      uniform float u_wiggleFreq;
      uniform float u_wiggleAmp;
      uniform float u_isEntity;
      uniform float u_isSky;

      uniform vec3 u_viewPos;
      uniform float u_fogNear;
      uniform float u_fogFar;
      uniform vec4 u_fogColor;

      layout(location = 0) out vec4 outColor;
      layout(location = 1) out vec4 outMask;

      vec2 wiggle(vec2 pt, float ampMult) {
        #if TIER < 3
          float offsetY = sin(pt.x * u_wiggleFreq + u_time * u_wiggleSpeed) * u_wiggleAmp * ampMult;
          float offsetX = sin(pt.y * u_wiggleFreq + u_time * u_wiggleSpeed) * u_wiggleAmp * ampMult;
          return vec2(pt.x + offsetX, pt.y + offsetY);
        #else
          return pt;
        #endif
      }

      void main() {
        if (u_isSky > 0.5) {
          #if TIER == 3
            outColor = vec4(u_fogColor.rgb, 1.0);
            outMask = vec4(0.0, 0.0, 0.0, 1.0);
            return;
          #endif
        }

        vec2 uv;
        if (u_isSky > 0.5) {
          vec3 viewDir = normalize(v_worldPos - u_viewPos);
          float theta = atan(viewDir.z, viewDir.x);
          uv = vec2(theta / 6.28318530718 + 0.5, v_texcoord.y);
          uv.y = viewDir.y * 0.5 + 0.5;
          uv = wiggle(uv, 0.5);
        } else {
          uv = wiggle(v_texcoord, 1.0);
        }

        vec3 normal = normalize(v_normal);
        vec3 worldNormal = normal;
        float roughness = 0.5;
        float spec = 0.0;

        #if TIER < 2
          vec3 tangent = normalize(v_tangent);
          vec3 bitangent = normalize(cross(normal, tangent));
          mat3 TBN = mat3(tangent, bitangent, normal);
          vec3 mapNormal = texture(u_normalMap, uv).rgb * 2.0 - 1.0;
          worldNormal = normalize(TBN * mapNormal);
        #endif

        vec3 lightPos = u_viewPos;
        vec3 lightDir = normalize(lightPos - v_worldPos);
        float diff = max(dot(worldNormal, lightDir), 0.1);

        if (u_isSky > 0.5) {
          diff = 1.0;
          spec = 0.0;
        } else {
          #if TIER < 3
            vec3 viewDir = normalize(u_viewPos - v_worldPos);
            vec3 reflectDir = reflect(-lightDir, worldNormal);
            #if TIER < 2
              roughness = texture(u_roughnessMap, uv).r;
            #endif
            spec = pow(max(dot(viewDir, reflectDir), 0.0), mix(64.0, 2.0, roughness)) * (1.0 - roughness);
          #endif
        }

        vec4 texColor = texture(u_diffuseMap, uv);
        vec3 finalColor = texColor.rgb * diff + spec;

        float dist = distance(u_viewPos, v_worldPos);
        float fogFactor = smoothstep(u_fogNear, u_fogFar, dist);
        if (u_isSky > 0.5) fogFactor = 0.0;

        outColor = vec4(mix(finalColor, u_fogColor.rgb, fogFactor), 1.0);
        outMask = vec4(u_isEntity, u_isSky, 0.0, 1.0);
      }
    `;
}

export const postVertexSource = `#version 300 es
      in vec4 a_position;
      in vec2 a_texcoord;
      out vec2 v_texcoord;
      void main() {
        gl_Position = a_position;
        v_texcoord = a_texcoord;
      }`;

export function buildPostFragmentSource(tier = 1, precision = 'highp'): string {
  return `#version 300 es
      precision ${precision} float;
      #define TIER ${tier}
      in vec2 v_texcoord;
      uniform sampler2D u_scene;
      uniform sampler2D u_mask;
      uniform vec2 u_resolution;
      out vec4 outColor;

      const int ditherTable[16] = int[](0,1,0,1,16,15,16,15,0,1,0,1,16,15,16,15);

      void main() {
        vec4 base = texture(u_scene, v_texcoord);
        vec4 maskData = texture(u_mask, v_texcoord);
        float isEntity = maskData.r;
        float isSky = maskData.g;
        vec3 final = base.rgb;

        if (isEntity < 0.5 && isSky < 0.5) {
          #if TIER < 3
            vec2 screenPos = v_texcoord * u_resolution;
            int ditherIndex = int(mod(screenPos.x, 4.0)) * 4 + int(mod(screenPos.y, 4.0));
            int ditherValue = ditherTable[ditherIndex];
            final += vec3(float(ditherValue)) * 0.0039215686;
            final = floor(final * 4.4) / 4.4;
          #endif
        }

        outColor = vec4(final, 1.0);
      }`;
}
