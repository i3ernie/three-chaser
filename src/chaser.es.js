import RotationChaser from "./RotationChaser.esm.js";
import PositionChaser from "./PositionChaser.esm.js";
import TWEEN from "../node_modules/@tweenjs/tween.js/dist/tween.esm.js";

const chaser = { RotationChaser : RotationChaser, PositionChaser : PositionChaser, TWEEN:TWEEN };

export default chaser;
export { RotationChaser, PositionChaser, TWEEN };