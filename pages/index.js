import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [dmgA1, setDmgA1] = useState({
    baseWeapon: 0,
    weapDmgPlus: 0,
    physDmgPlus: 0,
    physPower: 0,
  });
  const [totalA1, setTotalA1] = useState(0);
  useEffect(() => {
    let flat =
      Number(dmgA1.baseWeapon) +
      Number(dmgA1.weapDmgPlus) +
      Number(dmgA1.physDmgPlus);
    let power = Number(1 + (dmgA1.physPower / 100 + 0.15));
    console.log("power", power);
    let total = flat * power;
    setTotalA1(total);
  }, [dmgA1]);
  const bodyParts = [
    ["Head", 1.4],
    ["Body", 0.94],
    ["Arms", 0.75],
    ["Legs", 0.56],
    ["Hands/Feet", 0.46],
  ];
  const [bodyOption, setBodyOption] = useState(bodyParts[0][1]);
  const [totalB1, setTotalB1] = useState(0);
  useEffect(() => {
    setTotalB1(Number(totalA1 * bodyOption));
  }, [totalA1, bodyOption]);
  const [armor, setArmor] = useState({ defense: 0, pen: 0, true: 0 });
  const [totalC1, setTotalC1] = useState(0);
  useEffect(() => {
    setTotalC1(Number(totalB1 - (totalB1 * (armor.defense - armor.pen)) / 100));
  }, [totalB1, armor]);
  return (
    <div className={styles.container}>
      <Head>
        <title>DnD Calculator</title>
        <meta name="description" content="Dark and Darker Damage Calculator" />
        <link rel="icon" href="/axe.ico" />
      </Head>

      <main className={styles.main}>
        <div>Dark and Darker ROUGH damage calculator</div>
        <div>
          (Calculates a single hit to a body part, Physical Only, No
          damaging ability multipliers + No combo bonuses)
        </div>
        <div className="grid grid-cols-3 border-4 p-4 gap-10 w-screen">
          <div
            className="flex flex-col
          justify-between text-center"
          >
            <div className="underline mb-2">Step 1 - Base Damage</div>
            <div>
              <div>Base Weapon Damage</div>
              <input
                className="text-center"
                type={Number}
                value={dmgA1.baseWeapon}
                onChange={(e) =>
                  setDmgA1({ ...dmgA1, baseWeapon: e.target.value })
                }
              />
            </div>
            <div>
              <div>+ Weapon Damage</div>
              <input
                className="text-center"
                type={Number}
                value={dmgA1.weapDmgPlus}
                onChange={(e) =>
                  setDmgA1({ ...dmgA1, weapDmgPlus: e.target.value })
                }
              />
            </div>
            <div>
              <div>+ Physical Damage</div>
              <input
                className="text-center"
                type={Number}
                value={dmgA1.physDmgPlus}
                onChange={(e) =>
                  setDmgA1({ ...dmgA1, physDmgPlus: e.target.value })
                }
              />
            </div>
            <div>
              <div>Physical Power Bonus</div>
              <input
                className="text-center"
                type={Number}
                value={dmgA1.physPower}
                onChange={(e) =>
                  setDmgA1({ ...dmgA1, physPower: e.target.value })
                }
              />
            </div>
            <div className="mt-4">
              <div className="text-xs">
                <div>Total Damage Step 3</div>
                <div>
                  (Base + (+)Weapon Dmg + (+)Physical Dmg) * (1 +(Physical Power
                  Bonus/100 + 0.15))
                </div>
                <br></br>
                <div>
                  ({dmgA1.baseWeapon} + {dmgA1.weapDmgPlus} +{" "}
                  {dmgA1.physDmgPlus}) * (1 + ({dmgA1.physPower}/100 + 15)) ={" "}
                  {totalA1}
                </div>
              </div>
            </div>
          </div>

          <div
            className="flex flex-col
          justify-between text-center"
          >
            <div className="underline">Step 2 - Body Part Multiplier</div>
            <div>
              <div>Body Part</div>
              <select
                className="text-center"
                onChange={(e) => setBodyOption(e.target.value)}
              >
                {bodyParts.map((i) => (
                  <option key={i} value={i[1]}>
                    {i[0]}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-xs">
              <div>Total Damage Step 2</div>
              <div>Total Damage Step 1 * Body Part Multiplier</div>
              <br></br>
              <div>
                {totalB1} * {bodyOption} = {totalB1}
              </div>
            </div>
          </div>

          <div
            className="flex flex-col
          justify-between text-center"
          >
            <div className="underline">Step 3 - Defense Modifers</div>
            <div>
              <div>
                <div>Physical Damage Reduction</div>
                <input
                  className="text-center"
                  type={Number}
                  value={armor.defense}
                  onChange={(e) =>
                    setArmor({ ...armor, defense: e.target.value })
                  }
                ></input>
                %
              </div>

              <div>
                <div>Armor Pen</div>
                <input
                  className="text-center"
                  type={Number}
                  value={armor.pen}
                  onChange={(e) => setArmor({ ...armor, pen: e.target.value })}
                ></input>
                %
              </div>
              <div>
                <div>True Damage</div>
                <input
                  className="text-center"
                  type={Number}
                  value={armor.true}
                  onChange={(e) => setArmor({ ...armor, true: e.target.value })}
                ></input>
              </div>
            </div>
            <div className="text-xs">
              <div>Total Damage Step 3</div>
              <div>
                (Total Step 2 * (100 - ( (Physical Damage Reduction) - (Armor
                Pen) ) ) ) / 100
              </div>
              <br></br>
              <div>
                ({totalB1} * ( 100 - ( {armor.defense} - {armor.pen} ))) / 100 ={" "}
                {totalC1}
              </div>
            </div>
          </div>
        </div>
        <div className="w-screen border-4 p-8 text-center flex-row">
          <div>Overall Total Damage</div>
          <div>Rounded(Total Step 3 + True Damage)</div>
          <div>
            <div className="flex items-center justify-center gap-2">
              <div>
                {totalC1} + {armor.true} =
              </div>
              <div className="text-2xl border-4 border-double p-1">
                {Math.round(Number(totalC1) + Number(armor.true))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
