#ifdef GL_ES
precision mediump float;	// set all floats to medium precision
#endif

attribute vec3 aPosition;

void main() {

  vec4 positionVec4 = vec4(aPosition, 1.0);

  // scale the rect by two, and move it to the center of the screen
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;

  // automatically sends the position info to the fragment shader
  gl_Position = positionVec4;

}