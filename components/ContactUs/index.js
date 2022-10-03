import Layout from "components/shared/Layout";
import styles from "./styles.module.scss";
import icons from "./icons";
import Head from "next/head";
import Button from "components/shared/Button";
import { siteName } from "lib/constants";

const contactInfo = [
  {
    head: "Address",
    content: "DEESS BV, TER WAARDE 50, 8900 IEPER, BELGIUM",
    icon: icons.location,
  },
  {
    head: "Mail us",
    content: "info@deess.be",
    icon: icons.mail,
  },
  // {
  //   head: "Call us",
  //   content: "+453 589758549",
  //   icon: icons.call,
  // },
];

const ContactUs = () => {
  return (
    <Layout>
      <Head>
        <title>Contact us - ${siteName}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.head}>
          <h1>Feel free to reach us</h1>
          <h2>For more info on our products</h2>
        </div>
        <div className={`${styles.row} ${styles.colGap}`}>
          <div className={styles.contactForm}>
            <div className={`${styles.row} ${styles.fieldGap}`}>
              <div className={styles.field}>
                <label>Name</label>
                <input type="text" />
              </div>
              <div className={styles.field}>
                <label>Email</label>
                <input type="text" />
              </div>
            </div>
            <div>
              <div className={styles.field}>
                <label>Message</label>
                <textarea rows={5}></textarea>
              </div>
            </div>
            <div>
              <Button>Send</Button>
            </div>
          </div>
          <div className={styles.contactInfo}>
            {contactInfo.map((info) => (
              <div
                key={info.head}
                className={`${styles.row} ${styles.iconGap}`}
              >
                <div className={styles.iconCol}>
                  <img src={info.icon.src} alt={info.head} />
                </div>
                <div>
                  <div className={styles.title}>{info.head}</div>
                  <div className={styles.content}>{info.content}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
