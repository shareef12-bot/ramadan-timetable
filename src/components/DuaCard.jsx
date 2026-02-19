import { useEffect, useState } from "react";

const duas = [
  {
    arabic: "اللهم إنك عفو تحب العفو فاعف عني",
    meaning: "O Allah, You are Forgiving and love forgiveness, so forgive me.",
  },
  {
    arabic: "ربنا آتنا في الدنيا حسنة وفي الآخرة حسنة وقنا عذاب النار",
    meaning:
      "Our Lord, give us good in this world and good in the Hereafter and protect us from the Fire.",
  },
  {
    arabic: "اللهم اغفر لي ولوالدي وللمؤمنين يوم يقوم الحساب",
    meaning:
      "My Lord, forgive me, my parents, and the believers on the Day of Judgment.",
  },
  {
    arabic: "اللهم أعني على ذكرك وشكرك وحسن عبادتك",
    meaning:
      "O Allah, help me remember You, thank You, and worship You properly.",
  },
  {
    arabic: "اللهم اهدني فيمن هديت وعافني فيمن عافيت",
    meaning:
      "O Allah, guide me among those You guided and grant me well-being.",
  },
];

export default function DuaCard() {
  const [dua, setDua] = useState(null);

  useEffect(() => {
    const today = new Date().toDateString();
    const saved = JSON.parse(localStorage.getItem("dailyDua"));

    if (saved && saved.date === today) {
      setDua(saved.dua);
    } else {
      const random = duas[Math.floor(Math.random() * duas.length)];
      localStorage.setItem(
        "dailyDua",
        JSON.stringify({ date: today, dua: random }),
      );
      setDua(random);
    }
  }, []);

  if (!dua) return null;

  return (
    <div className="duaCard">
      <h2>🌙 Dua of the Day</h2>
      <p className="arabic">{dua.arabic}</p>
      <p className="meaning">{dua.meaning}</p>
    </div>
  );
}
