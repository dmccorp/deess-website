import { CircularProgress, Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import classNames from "classnames";
import Button from "components/shared/Button";
import Layout from "components/shared/Layout";
import { siteName } from "lib/constants";
import Head from "next/head";
import { useRef, useState } from "react";
import styles from "./styles.module.scss";

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve({
        name: file.name,
        content: reader.result.slice(reader.result.indexOf(",")),
      });
    reader.onerror = (error) => reject(error);
  });
}

function Upload() {
  const file = useRef();
  const [filename, setFilename] = useState("");
  const [invalid, setInvalid] = useState(false);
  const changeFile = (e) => {
    if (e.target.files.length) {
      setFilename(e.target.files[0].name);
      setInvalid(false);
    }
  };
  return (
    <div className={styles.field}>
      <div
        className={classNames(styles.upload, { [styles.error]: invalid })}
        onClick={() => file.current.click()}
      >
        <div>
          {filename
            ? `Selected: ${filename}`
            : "Zip containing CAD (.dwg) files of the design"}
        </div>
        <input
          type="file"
          style={{ display: "none" }}
          ref={file}
          onChange={changeFile}
          accept=".zip"
          name="designFiles"
          required
          onInvalid={(e) => setInvalid(e.target.validity.valid)}
        />
      </div>
    </div>
  );
}

export default function LightingDesign() {
  const [submitted, setSubmitted] = useState(false);
  const [busy, setBusy] = useState(false);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    const formData = new FormData(e.target);
    const plainFormData = Object.fromEntries(formData.entries());
    delete plainFormData.designFiles;
    plainFormData.attachments = await Promise.all(
      [...e.target.designFiles.files].map((file) => getBase64(file))
    );
    const body = JSON.stringify(plainFormData);

    const rsp = await fetch("/api/lighting-design", {
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
    setBusy(false);
  };
  return (
    <Layout>
      <Head>
        <title>Lighting design | {siteName}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.head}>
          <h1>Building your dream home?</h1>
          <h2>
            At Déess, we can design lighting as per your needs by filling in the
            form below.
          </h2>
        </div>
        <form className={styles.rows} onSubmit={onSubmit}>
          <div className={styles.fields}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Name</label>
                <input type="text" name="name" required />
              </div>
              <div className={styles.field}>
                <label>Contact</label>
                <input type="text" name="contact" required />
              </div>
              <div className={styles.field}>
                <label>Project name</label>
                <input type="text" name="project" required />
              </div>
              <div className={styles.field}>
                <label>Project location</label>
                <input type="text" name="location" required />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.field}>
                <label>Email</label>
                <input type="email" name="email" required />
              </div>
              <div className={styles.field}>
                <label>Phone</label>
                <input type="phone" name="phone" required />
              </div>
              <div className={styles.field}>
                <label>Required design date by</label>
                <input
                  type="date"
                  name="required_by"
                  placeholder="dd/mm/yy"
                  required
                />
              </div>
              <div className={styles.field}></div>
            </div>
          </div>
          <div>
            <h3>Upload files</h3>
            <div className={styles.row}>
              <Upload />
            </div>
            <div className={styles.foot}>
              <Button>
                {busy ? (
                  <Box
                    sx={{
                      display: "flex",
                      height: "50px",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress sx={{ color: "white" }} size={25} />
                  </Box>
                ) : (
                  "Upload"
                )}
              </Button>
            </div>
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
              We thank you for your interest in Déess.
            </Typography>
            <Typography>
              One of our representatives will contact you with more information.
            </Typography>
          </Box>
        </Modal>
      </div>
    </Layout>
  );
}
