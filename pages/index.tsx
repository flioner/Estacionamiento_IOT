import React, { useState, useEffect } from "react";
import Head from "next/head";
import s from "../styles/Home.module.css";
import Firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";

export default function Home() {
  const [lugares, updateDisponibles] = useState(0);

  const firebaseConfig = {
    apiKey: "",
    authDomain: ``,
    databaseURL: ``,
  };

  const firebaseApp = initializeApp(firebaseConfig);
  const database = getDatabase(firebaseApp);

  useEffect(() => {
    const starCountRef = ref(database, "number");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      if (data != null) {
        updateDisponibles(data);
      }
    });
  }, []);

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
        <div>3</div>
      </div>

      <div className={s.grid}>
        <div className={s.disponible}>1</div>
        <div className={lugares == 42 ? s.ocupado : s.disponible}>2</div>
        <div className={s.disponible}>3</div>
        <div className={s.disponible}>4</div>
      </div>

      <div>{lugares}</div>
    </div>
  );
}
