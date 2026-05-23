// this was just converted from Dave and Bambi source code LMAOOOOOOOO --thorns

uniform float uTime;
uniform int uEffectType;
uniform float uSpeed;
uniform float uFrequency;
uniform float uWaveAmplitude;

vec2 sineWave(vec2 pt) {
    float x = 0.0;
    float y = 0.0;
    
    if (uEffectType == 0) { // DREAMY
        float offsetX = sin(pt.y * uFrequency + uTime * uSpeed) * uWaveAmplitude;
        pt.x += offsetX;
    } 
    else if (uEffectType == 1) { // WAVY
        float offsetY = sin(pt.x * uFrequency + uTime * uSpeed) * uWaveAmplitude;
        pt.y += offsetY;
    } 
    else if (uEffectType == 2) { // HEAT_WAVE_HORIZONTAL
        x = sin(pt.x * uFrequency + uTime * uSpeed) * uWaveAmplitude;
    } 
    else if (uEffectType == 3) { // HEAT_WAVE_VERTICAL
        y = sin(pt.y * uFrequency + uTime * uSpeed) * uWaveAmplitude;
    } 
    else if (uEffectType == 4) { // FLAG
        y = sin(pt.y * uFrequency + 10.0 * pt.x + uTime * uSpeed) * uWaveAmplitude;
        x = sin(pt.x * uFrequency + 5.0 * pt.y + uTime * uSpeed) * uWaveAmplitude;
    }
    
    return vec2(pt.x + x, pt.y + y);
}

void main() {
    // apply the displacement to the UV coordinates --thorns
    vec2 uv = sineWave(vTextureCoord);
    
    // sample the texture using the distorted UVs --thorns
    gl_FragColor = texture2D(uSampler, uv);
}
