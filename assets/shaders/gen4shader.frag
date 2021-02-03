#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979323846

uniform vec2 resolution;
uniform float time;
uniform vec2 mouse;
uniform sampler2D tex;
varying vec2 texCoord;

float map(float value, float min1, float max1, float min2, float max2) {
    float perc = (value - min1) / (max1 - min1);
    return perc * (max2 - min2) + min2;
}

float random(float x) {
    float y = fract(sin(x)*10000.0);
    return y;
}

float noise(float x) {
    float i = floor(x);  // integer
    float f = fract(x);  // fraction
    //float u = f * f * (3.0 - 2.0 * f ); // custom cubic curve
    //u = sin(f) + cos(f) * 2.0;
    //float y = mix(rand(i), rand(i + 1.0), u);
    float y = mix(random(i), random(i + 1.0), smoothstep(0.,1.,f));
    //y = rand(i);
    return y;
}

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main (void) {
    vec2 st = gl_FragCoord.xy/resolution.xy;

    vec2 uv = vec2(texCoord.x, 1.0-texCoord.y);
    vec2 mirror = vec2(min(uv.x, abs(uv.x-1.0)), uv.y);
    // vec2 mirror = uv;
    mirror.x = fract(mirror.x + noise(st+time));

    vec4 final = texture2D(tex, mirror);

    gl_FragColor = final;
}
