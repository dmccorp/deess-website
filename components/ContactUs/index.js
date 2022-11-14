import Layout from "components/shared/Layout";
import styles from "./styles.module.scss";
import icons from "./icons";
import Head from "next/head";
import Button from "components/shared/Button";
import { siteName } from "lib/constants";
import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

const contactInfo = [
  {
    head: "Address",
    content: "DÉESS BV, TER WAARDE 50, 8900 IEPER, BELGIUM",
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
  const [submitted, setSubmitted] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const plainFormData = Object.fromEntries(formData.entries());
    const body = JSON.stringify(plainFormData);
    const rsp = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body,
    });
    if (rsp.ok) {
      setSubmitted(true);
      e.target.reset();
    }
  };
  return (
    <Layout>
      <Head>
        <title>Contact us | {siteName}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.head}>
          <h1>Feel free to reach us</h1>
          <h2>For more info on our products</h2>
        </div>
        <div className={`${styles.row} ${styles.colGap}`}>
          <form
            className={styles.contactForm}
            action="/api/contact"
            onSubmit={onSubmit}
          >
            <div className={`${styles.row} ${styles.fieldGap}`}>
              <div className={styles.field}>
                <label>Name</label>
                <input type="text" name="name" required />
              </div>
              <div className={styles.field}>
                <label>Email</label>
                <input type="email" name="email" required />
              </div>
            </div>
            <div>
              <div className={styles.field}>
                <label>Message</label>
                <textarea rows={5} name="message" required></textarea>
              </div>
            </div>
            <div>
              <Button>Send</Button>
            </div>
          </form>
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
          <Modal open={submitted} onClose={() => setSubmitted(false)}>
            <Box
              sx={{
                p: 3,
                bgcolor: "#fff",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                borderRadius: 2,
                boxShadow: 24,
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                We thank you for your interest in Déess.
              </Typography>
              <Typography>
                One of our representatives will contact you with more
                information.
              </Typography>
            </Box>
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default ContactUs;
