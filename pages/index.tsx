import React, { useState, useEffect } from "react";
import Head from "next/head";
import s from "../styles/Home.module.css";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";

export default function Home() {
  const [lugares, updateDisponibles] = useState(0);
  const firebaseProject = "Estacionamiento";

  const firebaseConfig = {
    apiKey: "<YOUR_WEB_API_KEY>",
    authDomain: `${firebaseProject}.firebaseapp.com`,
    databaseURL: `https://${firebaseProject}.firebaseio.com`,
    projectId: `${firebaseProject}`,
  };

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  const starCountRef = ref(database, "Lugares");
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    updateDisponibles(data);
  });

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
        <div className={s.ocupado}>2</div>
        <div className={s.disponible}>3</div>
        <div className={s.disponible}>4</div>
      </div>

      <div>{lugares}</div>
    </div>
  );
}
