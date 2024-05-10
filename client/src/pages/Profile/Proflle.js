import React, { useRef, useState } from "react";
import Header from "../../components/header/Header";
import { Box } from "@mui/system";
import {
  Avatar,
  Button,
  ButtonBase,
  Container,
  Grid,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import me from "../../assets/images/me.jpg";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { addUserData } from "../../store/actions/userActions";

function Proflle() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const questions = useSelector((state) => state.questions.all);

  const user = useSelector((state) => state.auth.user);

  const userData = useSelector((state) => state.userData);
  console.log("user data in profile", userData);

  const answers = useSelector((state) => state.answers);
  console.log({ questions });

  const userQuestions = questions.filter(
    (ques) => ques.user && ques.user._id === user.id
  );

  console.log("userQuestions", userQuestions);

  const userAnswers = answers.filter((ans) => ans.user.id === user.id);
  console.log("userAnswers", userAnswers);

  const [open, setOpen] = useState(false);
  const bio = useRef("");
  const profilePicture = useRef("");
  const facebookLink = useRef("");
  const instagramLink = useRef("");
  const whatsappLink = useRef("");
  const linkedInLink = useRef("");
  const telegramLink = useRef("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function ImageUpload(e) {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = function (e) {
        profilePicture.current = e.target.result;
      };
    }
  }
  const prevImage = userData?.photoUrl;

  const handleFormSubmit = () => {
    const userData = {
      bio: bio.current,
      photoUrl:
        profilePicture.current === "" ? prevImage : profilePicture.current,
      facebookLink: facebookLink.current,
      instagramLink: instagramLink.current,
      whatsappLink: whatsappLink.current,
      linkedInLink: linkedInLink.current,
      telegramLink: telegramLink.current,
    };
    dispatch(addUserData({ userData, userId: user.id }));
    handleClose();
  };

  const checkNoOfAnswers = (id) => {
    const filterAnswers = answers.filter((ans) => ans.questionId === id);
    return filterAnswers.length;
  };

  const DialogForm = () => {
    return (
      <Box sx={{ position: "absolute", top: -500, width: "500px" }}>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent
            sx={{
              width: { md: "400px", sm: "380px", xs: "350px" },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              name="bio"
              onChange={(e) => (bio.current = e.target.value)}
              label="Enter Bio"
              type="text"
              variant="standard"
              sx={{ maxWidth: "400px" }}
              multiline
            />
            <label
              style={{
                marginTop: "20px",
                marginBottom: "5px",
                fontFamily: "merriweather",
                fontSize: "15px",
              }}
            >
              Upload Profile Picture
            </label>
            <TextField
              onChange={ImageUpload}
              name="profilePicture"
              type="file"
              variant="standard"
            />
            <label
              style={{
                marginTop: "20px",
                marginBottom: "5px",
                fontFamily: "merriweather",
                fontSize: "18px",
              }}
            >
              Enter Your social Links
            </label>
            <label
              style={{
                marginTop: "20px",
                marginBottom: "5px",
                fontFamily: "merriweather",
                fontSize: "14px",
              }}
            >
              Facebook
            </label>
            <TextField
              onChange={(e) => (facebookLink.current = e.target.value)}
              name="facebookLink"
              label="username"
              type="text"
              inputProps={{
                maxLength: 200,
              }}
              variant="standard"
              sx={{ maxWidth: "400px" }}
              multiline
            />
            <label
              style={{
                marginTop: "20px",
                marginBottom: "5px",
                fontFamily: "merriweather",
                fontSize: "14px",
              }}
            >
              Instagram
            </label>
            <TextField
              onChange={(e) => (instagramLink.current = e.target.value)}
              name="instagramLink"
              label="username"
              type="text"
              inputProps={{
                maxLength: 200,
              }}
              variant="standard"
              sx={{ maxWidth: "400px" }}
              multiline
            />
            <label
              style={{
                marginTop: "20px",
                marginBottom: "5px",
                fontFamily: "merriweather",
                fontSize: "14px",
              }}
            >
              WhatsApp
            </label>
            <TextField
              onChange={(e) => (whatsappLink.current = e.target.value)}
              name="whatsappLink"
              label="Number"
              type="text"
              inputProps={{
                maxLength: 200,
              }}
              variant="standard"
              sx={{ maxWidth: "400px" }}
              multiline
            />
            <label
              style={{
                marginTop: "20px",
                marginBottom: "5px",
                fontFamily: "merriweather",
                fontSize: "14px",
              }}
            >
              LinkedIn
            </label>
            <TextField
              onChange={(e) => (linkedInLink.current = e.target.value)}
              name="linkedInLink"
              label="username"
              type="text"
              inputProps={{
                maxLength: 200,
              }}
              variant="standard"
              sx={{ maxWidth: "400px" }}
              multiline
            />
            <label
              style={{
                marginTop: "20px",
                marginBottom: "5px",
                fontFamily: "merriweather",
                fontSize: "14px",
              }}
            >
              Telegram
            </label>
            <TextField
              onChange={(e) => (telegramLink.current = e.target.value)}
              name="telegramLink"
              label="username"
              type="link"
              inputProps={{
                maxLength: 200,
              }}
              variant="standard"
              sx={{ maxWidth: "400px" }}
              multiline
            />
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              sx={{
                fontFamily: "merriweather",
                backgroundColor: "#EC6F66",

                "&:hover": { backgroundColor: "#6E48AA" },
                fontSize: "10px",
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{
                fontFamily: "merriweather",
                backgroundColor: "#6E48AA",

                "&:hover": { backgroundColor: "#EC6F66" },
                fontSize: "10px",
              }}
              onClick={handleFormSubmit}
            >
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };

  return (
    <Box>
      <Header />
      <DialogForm />
      <Container maxWidth="md" sx={{ marginTop: "20px" }}>
        <Paper
          variant="outlined"
          sx={{ width: "100%", height: "fit-content", paddingBottom: "30px" }}
        >
          <Grid container sx={{ marginTop: "30px" }}>
            <Grid
              item
              lg={4}
              md={4}
              sm={4}
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar
                src={userData?.photoUrl || prevImage}
                sx={{
                  width: "100px",
                  height: "100px",
                  marginLeft: { sm: "40px", xs: 0 },
                  objectFit: "cover",
                }}
              />
            </Grid>
            <Grid
              item
              lg={8}
              md={8}
              sm={8}
              xs={12}
              sx={{
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: { lg: 25, md: 25, sm: 22, xs: 20 },
                  fontFamily: "merriweather",
                  color: "#6E48AA",
                  maxWidth: { sm: "400px", xs: "100%" },
                  overflow: "hidden",
                  whiteSpace: "pre-wrap",
                  textAlign: { sm: "left", xs: "center" },
                  marginLeft: { sm: "-20px", xs: 0 },
                }}
              >
                {user.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    lg: "16px",
                    md: "16px",
                    sm: "14px",
                    sx: "12px",
                  },
                  fontFamily: "merriweather",
                  color: "#808080",
                  maxWidth: { sm: "400px", xs: "100%" },
                  overflow: "hidden",
                  whiteSpace: "pre-wrap",
                  textAlign: { sm: "left", xs: "center" },
                  marginLeft: { sm: "-20px", xs: 0 },
                  marginTop: "10px",
                }}
              >
                {userData?.bio}
              </Typography>
            </Grid>
          </Grid>
          <Grid container sx={{}}>
            <Grid item lg={4} md={4} sm={4} xs={12}></Grid>
            <Grid
              item
              lg={8}
              md={8}
              sm={8}
              xs={12}
              sx={{
                marginLeft: { md: "-95px", sm: "-90px", xs: 0 },
                marginTop: "50px",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <Box
                sx={{
                  display: userData?.facebookLink !== "" ? "block" : "none",
                }}
              >
                <Link
                  href={`https://facebook.com/${userData?.facebookLink}`}
                  target="_blank"
                >
                  <FacebookIcon
                    style={{ fontSize: "35px", color: "#6E48AA" }}
                  />
                </Link>
              </Box>
              <Box
                sx={{
                  display: userData?.instagramLink !== "" ? "block" : "none",
                }}
              >
                <Link
                  href={`https://instagram.com/${userData?.instagramLink}`}
                  target="_blank"
                >
                  <InstagramIcon
                    style={{ fontSize: "35px", color: "#6E48AA" }}
                  />
                </Link>
              </Box>
              <Box
                sx={{
                  display: userData?.linkedInLink !== "" ? "block" : "none",
                }}
              >
                <Link
                  href={`https://www.linkedin.com/in/${userData?.linkedInLink}`}
                  target="_blank"
                >
                  <LinkedInIcon
                    style={{ fontSize: "35px", color: "#6E48AA" }}
                  />
                </Link>
              </Box>
              <Box
                sx={{
                  display: userData?.telegramLink !== "" ? "block" : "none",
                }}
              >
                <Link
                  href={`https://t.me/${userData?.telegramLink}`}
                  target="_blank"
                >
                  <TelegramIcon
                    style={{ fontSize: "35px", color: "#6E48AA" }}
                  />
                </Link>
              </Box>
              <Box
                sx={{
                  display: userData?.whatsappLink !== "" ? "block" : "none",
                }}
              >
                <Link
                  href={`https://wa.me/${userData?.whatsappLink}`}
                  target="_blank"
                >
                  <WhatsAppIcon
                    style={{ fontSize: "35px", color: "#6E48AA" }}
                  />
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Grid sx={{ textAlign: "center", marginTop: "30px" }}>
            <Button
              variant="contained"
              sx={{
                fontFamily: "merriweather",
                backgroundColor: "#6E48AA",

                "&:hover": { backgroundColor: "#EC6F66" },
                transform: "scale(0.8)",
                marginLeft: { md: "-230px", sm: "-200px" },
              }}
              onClick={handleClickOpen}
            >
              Edit Profile
            </Button>
          </Grid>
        </Paper>

        {/* user questions section  */}

        <div>
          <Accordion sx={{ marginTop: "30px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: { lg: 25, md: 25, sm: 22, xs: 20 },
                  fontFamily: "merriweather",
                  color: "#6E48AA",
                  borderLeft: "5px solid #6e48aa",
                  paddingLeft: "15px",
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                }}
              >
                Your Questions ({userQuestions.length})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {userQuestions.map((question) => {
                const answersLength = checkNoOfAnswers(question._id);

                return (
                  <ButtonBase
                    onClick={() =>
                      navigate(`/detailedQuestion/${question._id}`)
                    }
                  >
                    <Grid
                      sx={{
                        borderBottom: "1px solid #d1d0d0",
                        padding: "10px",
                        marginTop: 2,
                        width: { lg: 800, md: 800, sm: "600px", xs: "340px" },
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 500,
                          fontSize: { lg: 23, md: 23, sm: 20, xs: 18 },
                          fontFamily: "merriweather",
                          color: "#6E48AA",
                          maxWidth: "700px",
                          overflow: "hidden",
                          whiteSpace: "pre-wrap",
                          textAlign: "left",
                        }}
                      >
                        {question.title}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: {
                            lg: "16px",
                            md: "16px",
                            sm: "14px",
                            sx: "12px",
                          },
                          fontFamily: "merriweather",
                          color: "#808080",
                          maxWidth: "600px",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textAlign: "left",
                          marginTop: "5px",
                        }}
                      >
                        {question.description}
                      </Typography>
                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "5px",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "merriweather",
                            fontSize: "13px",
                          }}
                        >
                          {answersLength + " " + "answers"}
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "merriweather", fontSize: "13px" }}
                        >
                          {moment(question.date).fromNow()}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ButtonBase>
                );
              })}
            </AccordionDetails>
          </Accordion>
        </div>

        <div>
          <Accordion sx={{ marginTop: "30px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography
                sx={{
                  fontWeight: 500,
                  fontSize: { lg: 25, md: 25, sm: 22, xs: 20 },
                  fontFamily: "merriweather",
                  color: "#6E48AA",
                  borderLeft: "5px solid #6e48aa",
                  paddingLeft: "15px",
                  borderTopLeftRadius: "5px",
                  borderBottomLeftRadius: "5px",
                }}
              >
                Your Answers ({userAnswers.length})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              {userAnswers.map((ans) => {
                return (
                  <ButtonBase
                    onClick={() =>
                      navigate(`/detailedQuestion/${ans.questionId}`)
                    }
                  >
                    <Grid
                      sx={{
                        borderBottom: "1px solid #d1d0d0",
                        padding: "10px",
                        marginTop: 2,
                        width: { lg: 800, md: 800, sm: "600px", xs: "340px" },
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: 500,
                          display: "block",
                          fontSize: { lg: 23, md: 23, sm: 20, xs: 18 },
                          fontFamily: "merriweather",
                          color: "#6E48AA",
                          maxWidth: "700px",
                          overflow: "hidden",
                          whiteSpace: "pre-wrap",
                          textAlign: "left",
                          maxHeight: "500px",
                        }}
                      >
                        {ans.answer}
                      </Typography>
                    </Grid>
                  </ButtonBase>
                );
              })}
            </AccordionDetails>
          </Accordion>
        </div>
      </Container>
    </Box>
  );
}

export default Proflle;
