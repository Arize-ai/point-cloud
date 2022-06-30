export function isOrthographicCamera(
  c: THREE.Camera
): c is THREE.OrthographicCamera {
  return (c as THREE.OrthographicCamera).isOrthographicCamera;
}
