import { animationArrayType } from "@/lib/types";

function runInsertionSort(array: number[], animations: animationArrayType) {
  for (let i = 0; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    while (j >= 0 && array[j] > key) {
      animations.push([[j, j + 1], false]); // Comparison animation
      animations.push([[j + 1, array[j]], true]); // Overwrite animation
      array[j + 1] = array[j];
      j--;
    }

    animations.push([[j + 1, key], true]); // Place key animation
    array[j + 1] = key; // Correctly place the key
  }
}
export function generateInsertionSortAnimationArray(
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: animationArrayType) => void
) {
  if (isSorting) return;
  if (array.length <= 1) return [];

  const animations: animationArrayType = [];
  const auxiliaryArray = array.slice();
  runInsertionSort(auxiliaryArray, animations);
  runAnimation(animations);
}
