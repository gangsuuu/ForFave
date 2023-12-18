uniform float uTime;
uniform float uHover;
uniform float uHoverX;
uniform float uHoverY;

varying vec2 vUv;

void main()
{
    vec2 toCenter = uv - 0.5;
    float dist = length(toCenter); // 0 ~ 0.5 * 20 => 0 ~ 10
    float dir = dot(toCenter, vec2(uHoverX, uHoverY));
    float strength = 3.5;

    float wave = sin(dist * 20.0 - uTime * 5.0);
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.z += wave * dist * dir * strength * uHover;
    // modelPosition.x += 120.0;
    gl_Position = projectionMatrix * viewMatrix * modelPosition;

    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0) ;
    vUv = uv;
}