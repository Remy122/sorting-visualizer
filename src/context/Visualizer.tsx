"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { animationArrayType, SortingAlgorithmType } from "../lib/types";
import {
  generateRandomNumberFromInterval,
  MAX_ANIMATION_SPEED,
} from "../lib/utils";

interface SortingAlgorithmContextType {
  arrayToSort: number[];
  selectedAlgorithm: SortingAlgorithmType;
  isSorting: boolean;
  setSelectedAlgorithm: (algorithm: SortingAlgorithmType) => void;
  setIsSorting: (isSorting: boolean) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  resetArrayAndAnimation: () => void;
  runAnimation: (animations: animationArrayType) => void;
  requiresReset: boolean;
}

const SortingAlgorithimContext = createContext<
  SortingAlgorithmContextType | undefined
>(undefined);

export const SortingAlgorithimProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [arrayToSort, setArrayToSort] = useState<number[]>([]);
  const [selectedAlgorithm, setSelectedAlgorithm] =
    useState<SortingAlgorithmType>("bubble");
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [animationSpeed, setAnimationSpeed] =
    useState<number>(MAX_ANIMATION_SPEED);
  const [isAnimationComplete, setIsAnimationComplete] =
    useState<boolean>(false);

  const requiresReset = isAnimationComplete || isSorting;

  useEffect(() => {
    resetArrayAndAnimation();
    window.addEventListener("resize", resetArrayAndAnimation);
    return () => window.removeEventListener("resize", resetArrayAndAnimation);
  }, []);

  const resetArrayAndAnimation = () => {
    const contentContainer = document.getElementById("content-container");
    if (!contentContainer) return;

    const contentContainerWidth = contentContainer.clientWidth;
    const tempArray: number[] = [];
    const numLines = contentContainerWidth / 8;
    const containerHeight = window.innerHeight;
    const maxLineHeight = Math.max(containerHeight - 420, 100);
    for (let i = 0; i < numLines; i++) {
      tempArray.push(generateRandomNumberFromInterval(35, maxLineHeight));
    }
    setArrayToSort(tempArray);
    setIsSorting(false);
    setIsAnimationComplete(false);
    resetLineColors();
  };

  const resetLineColors = () => {
    const arrLines = document.getElementsByClassName("array-line");
    for (let i = 0; i < arrLines.length; i++) {
      arrLines[i].classList.remove("change-line-color");
      arrLines[i].classList.add("default-line-color");
    }
  };

  const runAnimation = (animations: animationArrayType) => {
    setIsSorting(true);
    const inverseSpeed = (1 / animationSpeed) * 200;
    const arrayLines = document.getElementsByClassName(
      "array-line"
    ) as HTMLCollectionOf<HTMLElement>;

    const updateClassList = (
      indexes: number[],
      className: string,
      removeClassName: string
    ) => {
      indexes.forEach((i) => {
        arrayLines[i].classList.add(className);
        arrayLines[i].classList.remove(removeClassName);
      });
    };

    const updateHeightValue = (lineIndex: number, newHeight: number) => {
      arrayLines[lineIndex].style.height = `${newHeight}px`;
    };

    animations.forEach((animation, index) => {
      setTimeout(() => {
        const [lineIndexes, isSwap] = animation;
        if (!isSwap) {
          updateClassList(
            lineIndexes,
            "change-line-color",
            "default-line-color"
          );
          setTimeout(
            () =>
              updateClassList(
                lineIndexes,
                "default-line-color",
                "change-line-color"
              ),
            inverseSpeed
          );
        } else {
          const [lineIndex, newHeight] = lineIndexes;
          updateHeightValue(lineIndex, newHeight!);
        }
      }, index * inverseSpeed);
    });
    const finalTimeout = animations.length * inverseSpeed;

    setTimeout(() => {
      Array.from(arrayLines).forEach((line) => {
        line.classList.add("pulse-animation", "change-line-color");
        line.classList.remove("default-line-color");
      });
      setTimeout(() => {
        Array.from(arrayLines).forEach((line) => {
          line.classList.remove("pulse-animation", "change-line-color");
          line.classList.add("default-line-color");
        });
        setIsSorting(false);
        setIsAnimationComplete(true);
      }, 1000);
    }, finalTimeout);
  };

  const value = {
    arrayToSort,
    selectedAlgorithm,
    setSelectedAlgorithm,
    isSorting,
    setIsSorting,
    animationSpeed,
    setAnimationSpeed,
    isAnimationComplete,
    resetArrayAndAnimation,
    runAnimation,
    requiresReset,
  };

  return (
    <SortingAlgorithimContext.Provider value={value}>
      {children}
    </SortingAlgorithimContext.Provider>
  );
};

export const useSortingAlgorithmContext = (): SortingAlgorithmContextType => {
  const context = useContext(SortingAlgorithimContext);
  if (context === undefined) {
    throw new Error(
      "useSortingAlgorithmContext must be used within a SortingAlgorithmProvider"
    );
  }
  return context;
};
