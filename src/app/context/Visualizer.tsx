"use client";

import { createContext, useContext, useState } from "react";
import { SortingAlgorithimType } from "../lib/types";
import { MAX_ANIMATION_SPEED } from "../lib/utils";

interface SortingAlgorithimContextType {
  arraytoSort: number[];
  setArrayToSort: (array: number[]) => void;
  selectedAlgorithim: SortingAlgorithimType;
  setSelectedAlgorithim: (algorithim: SortingAlgorithimType) => void;
  isSorting: boolean;
  setIsSorting: (isSorting: boolean) => void;
  speed: number;
  setSpeed: (speed: number) => void;
  isAnimationComplete: boolean;
  setIsAnimationComplete: (isAnimationComplete: boolean) => void;
  resetArrayAndAnimation: () => void;
  runAnimation: () => void;
  stopAnimation: () => void;
}

const SortingAlgorithimContext = createContext<
  SortingAlgorithimContextType | undefined
>(undefined);

export const SortingAlgorithimProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [arraytoSort, setArrayToSort] = useState<number[]>([]);
  const [selectedAlgorithim, setSelectedAlgorithim] =
    useState<SortingAlgorithimType>("bubble");
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(MAX_ANIMATION_SPEED);
  const [isAnimationComplete, setIsAnimationComplete] =
    useState<boolean>(false);

  const resetArrayAndAnimation = () => {};

  const runAnimation = () => {};

  const stopAnimation = () => {};

  const value = {
    arraytoSort,
    setArrayToSort,
    selectedAlgorithim,
    setSelectedAlgorithim,
    isSorting,
    setIsSorting,
    speed,
    setSpeed,
    isAnimationComplete,
    setIsAnimationComplete,
    resetArrayAndAnimation,
    runAnimation,
    stopAnimation,
  };

  return (
    <SortingAlgorithimContext.Provider value={value}>
      {children}
    </SortingAlgorithimContext.Provider>
  );
};
export const useSortingAlgorithimContext = () => {
  const context = useContext(SortingAlgorithimContext);
  if (!context) {
    throw new Error(
      "useSortingAlgorithim must be used within a SortingAlgorithimProvider"
    );
  }
  return context;
};
