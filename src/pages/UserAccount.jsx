import { useState } from "react";
import Button from "../components/General/Button";
import Input from "../components/General/Input";
import styles from "./UserAccount.module.css";
import { changePassword, updateProfile } from "../utils/apiCalls";
import Alert from "../components/General/Alert";
import { useUser } from "../contexts/UserContext";
import Header from "../components/General/Header";
function UserAccount() {
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  const [newPhoto, setNewPhoto] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState("");
  const { id: userId, dispatch } = useUser();

  async function handleUpdatePassword(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await changePassword(
        currentPassword,
        newPassword,
        confirmNewPassword
      );
      console.log(res);
      if (res.status === "success") {
        setAlert("Password updated successfully");
      } else {
        setAlert(res.message);
      }
    } catch (err) {
      setAlert(err.message);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleUpdateProfilePicture(e) {
    e.preventDefault();
    setIsLoading(true);
    const form = new FormData();
    form.append("photo", newPhoto[0]);
    try {
      const res = await updateProfile(userId, form);
      console.log(res.data.photo);
      if (res.status === "success") {
        setAlert("Photo updated successfully");
        dispatch({ type: "user/updatedPhoto", payload: res.data.photo });
      } else {
        setAlert(res.message);
      }
    } catch (err) {
      setAlert(err.message);
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header>Configure your account</Header>
      <div className={styles.container}>
        <form onSubmit={handleUpdatePassword}>
          <h3 className={styles.header}>Change your password</h3>
          <div className={styles.formGroup}>
            <div className={styles.inputGroup}>
              <h3>Enter your current password</h3>
              <Input
                field={currentPassword}
                type="password"
                setterFunction={setCurrentPassword}
              />
            </div>
            <div className={styles.inputGroup}>
              <h3>Enter your new password</h3>
              <Input
                field={newPassword}
                type="password"
                setterFunction={setNewPassword}
              />
            </div>
            <div className={styles.inputGroup}>
              <h3>Confirm your new password</h3>
              <Input
                field={confirmNewPassword}
                type="password"
                setterFunction={setConfirmNewPassword}
              />
            </div>
          </div>
          <Button processing={isLoading}>Update </Button>
          <Alert>{alert}</Alert>
        </form>
        <form onSubmit={handleUpdateProfilePicture}>
          <h3 className={styles.header}>Update your profile picture</h3>
          <div className={styles.formGroup}>
            <input
              onChange={(e) => setNewPhoto(e.target.files)}
              type="file"
            ></input>
            <Button processing={isLoading}>Update</Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default UserAccount;
