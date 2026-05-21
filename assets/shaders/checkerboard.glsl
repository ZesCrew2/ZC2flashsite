precision mediump float;
uniform float uTime;
uniform vec2 uResolution;

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    
    // Looping movement --thorns
    uv.x += uTime * 0.05;
    uv.y += uTime * 0.05;
    
    // Scale for checkerboard --thorns
    vec2 pos = floor(uv * 10.0);
    float pattern = mod(pos.x + pos.y, 2.0);
    
    vec3 color1 = vec3(0.1, 0.1, 0.1);
    vec3 color2 = vec3(0.15, 0.15, 0.15);
    
    gl_FragColor = vec4(mix(color1, color2, pattern), 1.0);
}
