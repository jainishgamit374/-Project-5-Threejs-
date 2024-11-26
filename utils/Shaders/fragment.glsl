// uniform float uTime;  // Time uniform
varying vec2 vUv;
varying float vElevitation;
precision mediump float;

uniform float uColorChange;

void main() {
    vec4 color1 = vec4(0.81, 0.44, 0.5, 1.0);
    vec4 color2 = vec4(1.0);

    vec4 color3 = vec4(0.18, 0.25, 0.66, 1.0);
    vec4 color4 = vec4(0.43, 0.43, 0.92, 1.0);

    float v = smoothstep(0.1, 3., vElevitation * 5.);
    vec4 colorpink = mix(color1, color2, v);
    vec4 colorblue = mix(color3, color4, v);

    vec4 colorchange = mix(colorpink, colorblue, uColorChange);

    gl_FragColor = colorchange;
}
