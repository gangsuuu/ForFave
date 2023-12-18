uniform sampler2D uTexture;
uniform float uTime;
uniform float uHover;
uniform float uHoverX;
uniform float uHoverY;
uniform float uOpacity;

varying vec2 vUv;

void main()
{
    vec2 toCenter = vUv - 0.5;
    float dist = length(toCenter); // 0 ~ 0.5 * 20 => 0 ~ 10
    float dir = dot(toCenter, vec2(uHoverX, uHoverY));
    float strength = 1.5;

    vec2 wave = vec2(sin(dist * 20.0 - uTime * 5.0), cos(dist * 20.0 - uTime * 5.0));
    vec2 newUV = vUv + wave * strength * dir * dist * uHover;
    
        
//   float dist =length(vUv - 0.5);
//     vec2 wave = vec2(sin(dist * 20.0), cos(dist * 20.0));
//     vec2 newUV = vUv + wave * 0.5;

    vec4 tex = texture2D(uTexture, newUV);
    tex.a = uOpacity;
    gl_FragColor = tex;
}