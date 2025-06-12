import Image from "next/image";
import Link from "next/link";

type Props = {
  st: any;
  step: string;
};

const LoginInfo = ({ st, step }: Props) => (
  <div className={`${st.info} ${step === "confirm" ? st.confirm : ""}`}>
    <div className={st.content}>
      <h1>Еще нет аккаунта?</h1>
      <span className={st.hello}>
        Твой аккаунт создается автоматически, когда ты покупаешь курс, и
        привязывается к номеру телефона. Ты все же можешь создать аккаунт
        вручную
      </span>
      <Link href="#" className="primary btn">
        Зарегистрироваться
      </Link>
      <Link className={st.logo_sk} href="https://sk.ru">
        <Image
          src="/images/sk-logo.png"
          width={150 * 3}
          height={34 * 3}
          alt="Сколково - участник"
        />
      </Link>
      <small className={st.copyright}>
        © ООО “СПЕЙСКУРС”, 2025.
        <br />
        Все права защищены.
      </small>
    </div>
  </div>
);

export default LoginInfo;
