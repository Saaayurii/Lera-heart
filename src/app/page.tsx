'use client';

import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const blk_pitn: Record<string, number[][]> = {
      block1: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
      block2: [[0, 1], [0, 0], [-1, 0], [0, -1]],
      block3: [[-1, 1], [0, 0], [-1, 0], [-1, -1]],
      block4: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
      block5: [[-1, 1], [0, 0], [-1, 0], [0, -1]],
      block6: [[0, -1], [0, 0], [-1, 0], [1, -1]],
      block7: [[-1, -1], [0, 0], [-1, 0], [1, 0]],
      block8: [[-1, 1], [0, 0], [-1, 0], [-1, -1]],
      block9: [[0, -1], [0, 0], [-1, 0], [1, 0]],
      block10: [[-1, 1], [0, 0], [-1, 0], [1, 0]],
      block11: [[2, 0], [0, 0], [-1, 0], [1, 0]],
      block12: [[0, 1], [0, 0], [-1, 0], [0, -1]],
      block13: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
      block14: [[1, 1], [0, 0], [-1, 0], [1, 0]],
      block15: [[1, -1], [0, 0], [-1, 0], [1, 0]],
      block16: [[-1, -1], [0, 0], [-1, 0], [1, 0]],
      block17: [[0, 1], [0, 0], [-1, 0], [0, -1]],
      block18: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
      block19: [[0, -1], [0, 0], [-1, 0], [1, 0]],
      block20: [[1, -1], [0, 0], [-1, 0], [1, 0]],
      block21: [[0, 1], [0, 0], [-1, 0], [-1, -1]],
      block22: [[1, 1], [0, 0], [-1, 0], [1, 0]],
      block23: [[0, 2], [0, 0], [0, -1], [0, 1]]
    };

    const offset_pitn: Record<string, number[]> = {
      block1: [5, 3],
      block2: [5, 1],
      block3: [3, 4],
      block4: [3, 2],
      block5: [3, -1],
      block6: [2, 5],
      block7: [2, 1],
      block8: [1, -1],
      block9: [1, -3],
      block10: [1, 2],
      block11: [0, 3],
      block12: [0, 0],
      block13: [-1, -4],
      block14: [0, -2],
      block15: [-2, 4],
      block16: [-2, 2],
      block17: [-2, 0],
      block18: [-3, -2],
      block19: [-4, 0],
      block20: [-3, 5],
      block21: [-5, 3],
      block22: [-4, 1],
      block23: [-6, 1]
    };

    const blocks = document.getElementsByClassName("block");
    const block = blocks[0] as HTMLElement;
    const love = document.getElementsByClassName("love")[0] as HTMLElement;
    let timer: NodeJS.Timeout | null = null;
    let index = 0;

    block.style.top = "50%";
    block.style.left = "50%";
    block.style.margin = "-20px 0 0 -20px";

    const block_left = parseFloat(window.getComputedStyle(block, null).left.slice(0, -2));
    const block_top = parseFloat(window.getComputedStyle(block, null).top.slice(0, -2));

    function Next() {
      if (++index >= 24) {
        if (timer) clearInterval(timer);
        Rise();
        return;
      }

      block.style.visibility = "visible";

      block.style.left = block_left + 40 * offset_pitn["block" + index][0] + "px";
      block.style.top = block_top - 40 * offset_pitn["block" + index][1] + "px";

      for (let i = 0; i < block.children.length; i++) {
        const child = block.children[i] as HTMLElement;
        child.style.left = blk_pitn["block" + index][i][0] * -40 + "px";
        child.style.top = blk_pitn["block" + index][i][1] * -40 + "px";
      }

      const clone_block = block.cloneNode(true);
      love.appendChild(clone_block);

      if (love.children.length >= 24) {
        const lastBlock = blocks[blocks.length - 1] as HTMLElement;
        (lastBlock.children[2] as HTMLElement).style.display = "none";
        block.style.display = "none";
      }
    }

    function Rise() {
      console.log("начало подъема");
      let timer2: NodeJS.Timeout | null = null;
      let distance = 0;
      const target = 120;
      const speed = 1;

      let love_top = parseFloat(window.getComputedStyle(love, null).top.slice(0, -2));

      timer2 = setInterval(() => {
        distance += speed;
        if (distance >= target) {
          if (timer2) clearInterval(timer2);
          console.log("подъем завершен");
        }

        love.style.top = (love_top - distance) + "px";
      }, 22);
    }

    setTimeout(() => {
      timer = setInterval(() => {
        Next();
      }, 300);
    }, 12000);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, []);

  return (
    <>
      <audio autoPlay loop id="audios" preload="auto">
        <source src="/MP3/1.mp3" />
      </audio>

      <div className="container">
        <div className="body_left">
          <img src="/images/biubiubiu.gif" alt="" draggable={false} />
        </div>

        <div className="body_center love">
          <div className="block">
            <div className="div1"></div>
            <div className="div2"></div>
            <div className="div3"></div>
            <div className="div4"></div>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="border">
          <div className="border-top"></div>
          <div className="border-bottom"></div>
        </div>
      </div>
    </>
  );
}
