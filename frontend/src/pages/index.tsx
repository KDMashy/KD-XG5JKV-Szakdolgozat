import type { NextPage } from "next";
import { useState } from "react";
import Divider from "../components/common/Divider";
import PageSubTitle from "../components/common/PageSubTitle";
import PageTitle from "../components/common/PageTitle";
import Paragraph from "../components/common/Paragraph";
import Container from "../components/Container";
import { useAuth } from "../hooks/useAuth";
import { useDarkMode } from "../hooks/useDarkMode";
import Link from "next/link";

const Home: NextPage = () => {
  const { darkMode } = useDarkMode();

  const { user } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: true,
  });

  const GenerateInformations = (list: string[], type: "social" | "info") => {
    if (type === "info") {
      return list.map((item, index) => (
        <PageSubTitle
          type={darkMode ? "dark" : "light"}
          tag="h3"
          title={item}
          key={item + index}
        />
      ));
    }
    return list.map((item, index) => (
      <Link href={item}>
        <a>
          <PageSubTitle
            type={darkMode ? "dark" : "light"}
            tag="h5"
            title={item}
            key={item + index}
          />
        </a>
      </Link>
    ));
  };

  return (
    <div className="rounded-lg p-10 text-lg font-noto grid grid-cols-11">
      <Container
        type={darkMode ? "dark" : "light"}
        className="col-start-1 col-span-7"
      >
        <>
          <PageTitle
            type={darkMode ? "dark" : "light"}
            title="A szakdolgozatom projektjéről"
          />
          <Paragraph
            type={darkMode ? "dark" : "light"}
            text="Az oldal egy szakdolgozat része ként készült el."
            className="mt-3"
          />
          <Paragraph
            type={darkMode ? "dark" : "light"}
            text="A célja, hogy egyesítse a projekt feladatainak menedzselését az egyéb feladatokkal, mint például csapatok kialakítása illetve csapaton és egyénileg lefolytatott beszélgetésével."
            className="mt-3"
          />
          <Paragraph
            type={darkMode ? "dark" : "light"}
            text="Rólam további információk az információk oldalsávban találhatóak"
            className="mt-3"
          />
        </>
      </Container>
      <Container
        type={darkMode ? "dark" : "light"}
        className="col-start-9 col-span-3"
      >
        <>
          <PageSubTitle
            type={darkMode ? "dark" : "light"}
            tag="h2"
            title="Információk"
            className="text-xl"
          />
          {GenerateInformations(informations, "info")}
          <Divider placement="middle" />
          <PageSubTitle
            type={darkMode ? "dark" : "light"}
            tag="h2"
            title="Média linkek"
            className="text-xl"
          />
          {GenerateInformations(socials, "social")}
        </>
      </Container>
    </div>
  );
};

export default Home;

const informations = ["Klepe Dominik", "domaklepe@gmail.com"];

const socials = ["https://www.facebook.com/dominik.klepe/"];

const mockText =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur eos, doloremque blanditiis obcaecati optio perferendis illo quod, aliquam odio iste accusamus maiores ratione neque maxime eius nisi a repellat aut culpa cum, consequatur impedit voluptas nesciunt. Hic cupiditate iste quam temporibus excepturi sapiente amet necessitatibus ipsam eius, nostrum quos eaque doloribus, laborum qui! Laudantium, quisquam tenetur? Sequi nulla quis quae optio vel dolorem voluptate natus. Praesentium aperiam ullam nesciunt repellat explicabo nihil consequatur pariatur incidunt eos tempore culpa facere temporibus, animi, labore vero ipsum quae deleniti eius doloremque commodi dicta! Soluta, obcaecati saepe consequuntur eligendi ducimus inventore provident? Excepturi ipsa soluta, qui fugiat tempore quod! Numquam perspiciatis exercitationem sunt cumque ipsa dolores expedita, quae eaque illum, assumenda qui facilis eligendi? Voluptatum adipisci deserunt aliquam, porro dolor nesciunt possimus officiis quaerat, obcaecati nostrum rerum quia quibusdam reprehenderit itaque corporis odit maiores quis quasi libero unde dolore ad consequuntur voluptatibus? Iure rerum ad labore maiores praesentium laboriosam ipsa earum itaque? Exercitationem voluptatibus tenetur quibusdam, placeat nostrum cupiditate! Fugiat corporis ex at ea doloremque ut? Consequuntur dolore itaque laborum omnis doloremque beatae! Esse animi tenetur aperiam, ab magnam nobis officiis voluptates, velit laboriosam ex dignissimos reprehenderit cumque qui quos explicabo. Officiis obcaecati delectus assumenda libero nostrum exercitationem at cupiditate expedita alias autem! Ipsa eveniet natus, neque repudiandae at atque odio deleniti voluptate voluptatibus, impedit quae unde vero. Quis, voluptas at, reprehenderit eveniet doloremque aut fugiat, fugit nobis quae modi deleniti quidem repudiandae esse soluta quod incidunt aliquam eos error illum temporibus nostrum repellendus iure magnam quibusdam. Consequuntur impedit ab ipsam laborum. Natus magni facere esse eum sed laborum doloribus fugiat aperiam nisi. Veniam saepe id nesciunt iste illum quo excepturi quaerat doloremque ad. Eligendi nemo hic odio cum ad expedita consequatur quos a! Sint ipsa impedit beatae iste eum consequuntur ipsam cum necessitatibus.";
