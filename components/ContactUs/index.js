import Layout from "components/shared/Layout";
import styles from "./styles.module.scss";
import icons from "./icons";
import Head from "next/head";
import Button from "components/shared/Button";
import { siteName } from "lib/constants";
import { Box, CircularProgress, Modal, Typography } from "@mui/material";
import { useState } from "react";

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
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      setSubmitted(true);
    }, 2000);
  };
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
        <form className={`${styles.row} ${styles.colGap}`} onSubmit={onSubmit}>
          <div className={styles.contactForm}>
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
              <Button>
                {busy ? (
                  <div
                    style={{
                      display: "flex",
                      height: "50px",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress sx={{ color: "white" }} size={25} />
                  </div>
                ) : (
                  "Send"
                )}
              </Button>
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
        </form>
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
              We thank you for your interest in Deess.
            </Typography>
            <Typography>You will receive get back to you soon.</Typography>
          </Box>
        </Modal>
      </div>
    </Layout>
  );
};

export default ContactUs;
