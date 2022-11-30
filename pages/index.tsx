import React, { useState, useEffect } from "react";
import Head from "next/head";
import s from "../styles/Home.module.css";
import Firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";

export default function Home() {
  const [lugares, updateLugares] = useState([0, 0, 0, 0]);
  const [boolLugares, updateBools] = useState([false, false]);

  const firebaseConfig = {
    apiKey: "",
    authDomain: ``,
    databaseURL: ``,
  };

  const UpdateAllLugares = (arr: any, pos: number) => {
    const newLugares = [];
    for (let i = 0; i < arr.length; i++) {
      if (i == pos) {
        newLugares.push(arr[i] + 1);
      } else {
        newLugares.push(arr[i]);
      }
    }
    updateLugares(newLugares);
  };

  const UpdateAllBools = (arr: any, pos: number) => {
    const newBools = [];
    for (let i = 0; i < arr.length; i++) {
      if (i == pos) {
        newBools.push(!arr[i]);
        if (!arr[i]) {
          UpdateAllLugares(lugares, i);
        }
      } else {
        newBools.push(arr[i]);
      }
    }
    updateBools(newBools);
  };

  const AddLugar = () => {
    const newLugares = lugares;
    newLugares.push(0);
    updateLugares(newLugares);
  };
  const firebaseApp = initializeApp(firebaseConfig);
  const database = getDatabase(firebaseApp);

  useEffect(() => {
    const starCountRef = ref(database, "lugar 1");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data != null) {
        updateLugares([data]);
      }
    });
  }, []);

  // Add Lugar
  // updateLugares([...lugares, 1])
  return (
    <div className={s.container}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Estacionamiento</title>
        <link rel="stylesheet" href="estacionamiento.css" />
      </Head>

      <div className={s.mainTitle}>Estacionamiento</div>
      <div className={s.disponibles}>
        <div>Lugares Disponibles:&nbsp;</div>
        <div>{lugares[0]}</div>
      </div>

      <div className={s.grid}>
        <div
          onClick={() => UpdateAllBools(boolLugares, 0)}
          className={`${s.lugar} ${
            boolLugares[0] == false ? s.disponible : s.ocupado
          }`}
        >
          1
        </div>
        <div
          onClick={() => UpdateAllBools(boolLugares, 1)}
          className={`${s.lugar} ${
            boolLugares[1] == false ? s.disponible : s.ocupado
          }`}
        >
          2
        </div>
        <div className={`${s.lugar} ${s.fueraDeServicio}`}>3</div>
        <div className={`${s.lugar} ${s.fueraDeServicio}`}>4</div>
      </div>

      <div className={s.disponibles}>
        <div onClick={() => AddLugar()}>Lugares más concurridos:</div>
      </div>

      <div className={s.grid}>
        {lugares.map((l, i) => (
          <div
            key={i}
            onClick={() => UpdateAllLugares(lugares, i)}
            className={`${s.lugar} ${
              lugares[i] <= 3
                ? s.lime
                : lugares[i] <= 5
                ? s.green
                : lugares[i] <= 7
                ? s.yellow
                : lugares[i] <= 9
                ? s.orange
                : lugares[i] <= 11
                ? s.red
                : s.darkRed
            }`}
          >
            {lugares[i]}
          </div>
        ))}
      </div>
    </div>
  );
}
