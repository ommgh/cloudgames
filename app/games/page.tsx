"use client";

import { ChevronRight, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Connect4Landing() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#19191D] text-[#EDEDF0] font-mono flex flex-col">
      <main className="flex-grow flex flex-col items-center justify-center p-4 space-y-8">
        <div className="max-w-4xl w-full space-y-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to Connect 4</h2>
          <p className="text-xl mb-6">
            Challenge your friends in this classic two-player connection game!
          </p>
        </div>

        <div className="bg-[#FD366E] p-6 rounded-lg shadow-lg max-w-4xl w-full">
          <h3 className="text-2xl font-bold mb-4 text-[#EDEDF0]">
            How to Play
          </h3>
          <ul className="list-disc list-inside text-[#EDEDF0] space-y-5">
            <li>Players take turns dropping colored discs into a 7x6 grid</li>
            <li>
              The discs fall straight down, occupying the lowest available space
            </li>
            <li>
              The first player to form a horizontal, vertical, or diagonal line
              of four discs wins
            </li>
            <li>
              If the grid fills up before a player wins, the game is a draw
            </li>
          </ul>
        </div>

        <div className="flex justify-center items-center space-x-4">
          <div className="w-8 h-8 bg-[#FD366E] rounded-full"></div>
          <div className="text-2xl font-bold">VS</div>
          <div className="w-8 h-8 bg-[#3ECF8E] rounded-full"></div>
        </div>

        <div className=" flex flex-row gap-5">
          <input
            type="text"
            value="Enter Room ID"
            onChange={() => {}}
            className="px-2 py-1 rounded mr-2 w-[43vh] text-[#EDEDF0] bg-[#19191D] border-[#FD366E] border-2 hover:border-[#FD366E] focus:border-[#FD366E] focus:outline-none"
          ></input>
          <button className="bg-[#FD366E] text-[#EDEDF0] px-8 py-4 rounded-lg text-xl font-bold flex items-center transition-transform transform hover:scale-105">
            JOIN ROOM
            <ChevronRight className="ml-4 font-bold" />
          </button>
          <button
            onClick={() => router.push("/games/connect/create")}
            className="bg-[#FD366E] text-[#EDEDF0] px-8 py-4 rounded-lg text-xl font-bold flex items-center justify-center transition-transform transform hover:scale-105"
          >
            CREATE ROOM
            <Plus className="ml-4 font-bold" />
          </button>
        </div>
      </main>
    </div>
  );
}
