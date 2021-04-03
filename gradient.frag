#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform vec2 u_resolution;

void main( void ) {

  vec2 st = gl_FragCoord.xy/u_resolution.xy;

  vec3 color1 = vec3(0.1, 0.1, 0.1);
  vec3 color2 = vec3(0.8, 0.8, 0.8);

  float mixValue = distance(st,vec2(0,1));
  vec3 color = mix(color1,color2,mixValue);

  gl_FragColor = vec4(color,mixValue);

}