import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { MenuItem } from "@mui/material";
import { Select } from "@mui/material";
import { Checkbox } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import images from "../../../assets/images";
import "./_register.scss";
import Alert, { notify } from "../../../components/Common/Alert";
import API from "../../../api";
import Utils from "../../../libs/Utils";
import {useNavigate} from "react-router-dom";
import PATHS from "../../../constants/Paths";
import Loading from "../../../components/Common/Loading";

const Register = () => {
    let navigate = useNavigate();
    const [selectedRole, setSelectedRole] = useState("USER");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [numberPhone, setNumberPhone] = useState("");
    const [address, setAddress] = useState("");
    const [nameCompany, setNameCompany] = useState("");
    const [addressCompany, setAddressCompany] = useState("");
    const [phoneCompany, setPhoneCompany] = useState("");
    const [emailCompany, setEmailCompany] = useState("");
    const [listDayOfWeek, setListDayOfWeek] = useState([]);
    const [specializationName, setSpecializationName] = useState();
    const [timeStart, setTimeStart] = useState("18:00:00");
    const [price, setPrice] = useState();
    const [gender, setGender] = useState("female");
    const [dateOfBirth, setDateOfBirth] = useState(
        moment(new Date()).format("YYYY-MM-DD")
    );
    const [isErrEmail, setIsErrEmail] = useState(false);
    const [isErrPass, setIsErrPass] = useState(false);
    const [isErrPhoneNumber, setIsErrPhoneNumber] = useState(false);
    const [isErrEmailCompany, setIsErrEmailCompany] = useState(false);
    const [isErrPhoneNumberCompany, setIsErrPhoneNumberCompany] = useState(false);

    const [activeStep, setActiveStep] = useState(0);
    const [skipped, setSkipped] = useState(new Set());
    const [isLoading, setIsLoading] = useState(false);
    const [specializationList, setSpecializationList] = useState([])

    const stepLabels = ["Select role", "Fill information"];

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    const selectDayOfWeek = (e, value) => {
        if (e.target.checked) {
            listDayOfWeek.push(value)
            setListDayOfWeek(listDayOfWeek)
        } else {
            const listDayOfWeekNew = listDayOfWeek.filter(item => item !== value)
            setListDayOfWeek(listDayOfWeekNew)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedRole === 'USER') {
            if (
              firstName &&
              lastName &&
              email &&
              userName &&
              passWord &&
              dateOfBirth &&
              address &&
              numberPhone
            ) {
                const validationMail = (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email)
                if (!validationMail) {
                    setIsErrEmail(true)
                    notify("Email invalid", "warring");
                    return;
                }
                if (confirmPassword !== passWord) {
                    setIsErrPass(true)
                    notify("Password and confirm password does not match", "warring");
                    return;
                }
                if (passWord.length < 5) {
                    setIsErrPass(true)
                    notify("Password must be more than 5 letters", "warring");
                    return;
                }
                const validationPhoneNumber = numberPhone ? (numberPhone.length === 10 || numberPhone.length === 11) : true;
                if (!validationPhoneNumber) {
                    setIsErrPhoneNumber(true)
                    notify("Phone number must be 10 or 11 letters", "warring");
                    return;
                }
                setIsLoading(true)
                const dataForm = {
                    firstName,
                    lastName,
                    email,
                    userName,
                    passWord,
                    numberPhone,
                    gender,
                    dateOfBirth,
                    addressOfUser: address
                };
                await API.registerUser(dataForm)
                    .then(async (res) => {
                      setIsLoading(false)
                      if (res.status === 200) {
                          Utils.popupAlert({
                              title: 'Register User successfully! Please Login!',
                              type: 'success',
                          }).then(() => navigate(PATHS.HOME));
                      }
                  }).catch((e) => {
                      Utils.popupAlert({ title: 'Oops...', text: 'Error Login', type: 'error' });
                      setIsLoading(false)
                  });
            } else {
                notify("Please fill out the information completely", "warring");
            }
        } else {
            if (
              firstName &&
              lastName &&
              email &&
              userName &&
              passWord &&
              numberPhone &&
              dateOfBirth &&
              address &&
              nameCompany &&
              addressCompany &&
              emailCompany &&
              price &&
              phoneCompany
            ) {
                const validationMail = (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(email)
                if (!validationMail) {
                    setIsErrEmail(true)
                    notify("Email invalid", "warring");
                    return;
                }
                if (confirmPassword !== passWord) {
                    setIsErrPass(true)
                    notify("Password and confirm password does not match", "warring");
                    return;
                }
                if (passWord.length < 5) {
                    setIsErrPass(true)
                    notify("Password must be more than 5 letters", "warring");
                    return;
                }
                const validationPhoneNumber = numberPhone ? (numberPhone.length === 10 || numberPhone.length === 11) : true;
                if (!validationPhoneNumber) {
                    setIsErrPhoneNumber(true)
                    notify("Phone number must be 10 or 11 letters", "warring");
                    return;
                }
                const validationMailCompany = (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(emailCompany)
                if (!validationMailCompany) {
                    setIsErrEmailCompany(true)
                    notify("Email company invalid", "warring");
                    return;
                }
                const validationPhoneNumberCompany = phoneCompany ? (phoneCompany.length >= 10) : true;
                if (!validationPhoneNumberCompany) {
                    setIsErrPhoneNumberCompany(true)
                    notify("Phone number must be more than 10", "warring");
                    return;
                }
                setIsLoading(true)
                const dataForm = {
                    firstName,
                    lastName,
                    email,
                    userName,
                    passWord,
                    numberPhone,
                    gender,
                    dateOfBirth,
                    addressOfUser: address,
                    nameCompany,
                    addressCompany,
                    emailCompany,
                    phoneCompany,
                    price,
                    listDayOfWeek,
                    specializationName,
                    timeStart
                };
                await API.registerMentor(dataForm)
                  .then(async (res) => {
                      setIsLoading(false)
                      if (res.status === 200) {
                          Utils.popupAlert({
                              title: 'Register Mentor successfully! Please Login!',
                              type: 'success',
                          }).then(() => navigate(PATHS.HOME));
                      }
                  }).catch((e) => {
                      Utils.popupAlert({ title: 'Oops...', text: 'Error Login', type: 'error' });
                      setIsLoading(false)
                  });
            } else {
                notify("Please fill out the information completely", "warring");
            }
        }
    };

    const getInitDataSpecialization = async () => {
        setIsLoading(true)
        await API.getSpecialization()
          .then(async (res) => {
              setIsLoading(false)
              if (res.status === 200) {
                  setSpecializationList(res.data.data)
                  setSpecializationName(res.data.data[0])
              }
        }).catch((e) => {
            Utils.popupAlert({ title: 'Oops...', text: 'Error Login', type: 'error' });
            setIsLoading(false)
        });
    }

    useEffect(() => {
        const getInitData = async () => {
            await getInitDataSpecialization()
        }
        getInitData()
    }, [])

    return (
        <>
            {isLoading && <Loading />}
            <Alert />
            <div className="Register Register__container">
                <CssBaseline />
                <div className="Register__content">
                    <div style={{fontWeight: "bold", fontSize: 40, marginBottom: "2em"}}>REGISTER</div>
                    <Stepper activeStep={activeStep} className="w-100">
                        {stepLabels.map((label, index) => {
                            const stepProps = {};
                            const labelProps = {};
                            if (isStepSkipped(index)) {
                                stepProps.completed = false;
                            }
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>
                                        {label}
                                    </StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    {activeStep === stepLabels.length ? (
                        <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                All steps completed - you&apos;re finished
                            </Typography>
                            <div className="pt-2 row">
                                <Button onClick={handleReset}>Reset</Button>
                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            {activeStep === 0 ? (
                                <>
                                    <div className="Register__content__form row mt-4">
                                        <div className="Register__content__form__item col-12 text-center">
                                            <Typography
                                                variant="h5"
                                                component="h2"
                                            >
                                                Select role
                                            </Typography>
                                            <RadioGroup
                                                aria-labelledby="role-group"
                                                name="role-group"
                                                value={selectedRole}
                                                onChange={(event) => {
                                                    setSelectedRole(
                                                        event.target.value
                                                    );
                                                }}
                                                row
                                            >
                                                <FormControlLabel
                                                    value="USER"
                                                    control={<Radio />}
                                                    label="User"
                                                />
                                                <FormControlLabel
                                                    value="MENTOR"
                                                    control={<Radio />}
                                                    label="Mentor"
                                                />
                                            </RadioGroup>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="Register__content__logo">
                                        <img
                                            src={images.Logo}
                                            alt="logo"
                                            width={200}
                                            height={100}
                                        />
                                    </div>
                                    <div className="Register__content__form row mt-4">
                                        <div className="Register__content__form__item col-6">
                                            <TextField
                                                autoComplete="given-name"
                                                name="firstName"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="First Name"
                                                autoFocus
                                                value={firstName}
                                                onChange={(event) => {
                                                    setFirstName(
                                                        event.target.value
                                                    );
                                                }}
                                            />
                                        </div>
                                        <div className="Register__content__form__item col-6">
                                            <TextField
                                                required
                                                fullWidth
                                                id="lastName"
                                                label="Last Name"
                                                name="lastName"
                                                autoComplete="family-name"
                                                value={lastName}
                                                onChange={(event) => {
                                                    setLastName(
                                                        event.target.value
                                                    );
                                                }}
                                            />
                                        </div>
                                        <div className="Register__content__form__item col-12 mt-3">
                                            <TextField
                                                type="email"
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email"
                                                name="email"
                                                autoComplete="email"
                                                value={email}
                                                onChange={(event) => {
                                                    setEmail(
                                                        event.target.value
                                                    );
                                                    setIsErrEmail(false)
                                                }}
                                                error={isErrEmail}
                                            />
                                        </div>
                                        <div className="Register__content__form__item col-12 mt-3">
                                            <TextField
                                                required
                                                fullWidth
                                                id="username"
                                                label="Username"
                                                name="username"
                                                autoComplete="username"
                                                value={userName}
                                                onChange={(event) => {
                                                    setUserName(
                                                        event.target.value
                                                    );
                                                }}
                                            />
                                        </div>
                                        <div className="Register__content__form__item col-12 mt-3">
                                            <TextField
                                                required
                                                fullWidth
                                                id="password"
                                                label="Password"
                                                name="password"
                                                type="password"
                                                autoComplete="current-password"
                                                value={passWord}
                                                onChange={(event) => {
                                                    setPassWord(
                                                        event.target.value
                                                    );
                                                    setIsErrPass(false)
                                                }}
                                                error={isErrPass}
                                            />
                                        </div>
                                        <div className="Register__content__form__item col-12 mt-3">
                                            <TextField
                                              required
                                              fullWidth
                                              id="confirmPassword"
                                              label="Confirm password"
                                              name="confirmPassword"
                                              type="password"
                                              autoComplete="current-password"
                                              value={confirmPassword}
                                              onChange={(event) => {
                                                  setConfirmPassword(
                                                    event.target.value
                                                  );
                                                  setIsErrPass(false)
                                              }}
                                              error={isErrPass}
                                            />
                                        </div>
                                        <div className="Register__content__form__item col-12 mt-3">
                                            <TextField
                                                fullWidth
                                                required
                                                id="numberphone"
                                                label="Number Phone"
                                                name="numberphone"
                                                autoComplete="numberphone"
                                                value={numberPhone}
                                                onChange={(event) => {
                                                    setNumberPhone(
                                                        event.target.value
                                                    );
                                                    setIsErrPhoneNumber(false)
                                                }}
                                                // type="number"
                                                error={isErrPhoneNumber}
                                            />
                                        </div>
                                        <div className="Register__content__form__item col-12 mt-3">
                                            <TextField
                                              fullWidth
                                              required
                                              id="address"
                                              label="Address"
                                              name="address"
                                              autoComplete="address"
                                              value={address}
                                              onChange={(event) => {
                                                  setAddress(
                                                    event.target.value
                                                  );
                                              }}
                                            />
                                        </div>
                                        {selectedRole === "MENTOR" && (
                                            <>
                                                <div className="Register__content__form__item col-12 mt-3">
                                                    <TextField
                                                        fullWidth
                                                        required
                                                        id="nameCompany"
                                                        label="Name Company"
                                                        name="nameCompany"
                                                        autoComplete="nameCompany"
                                                        value={nameCompany}
                                                        onChange={(event) => {
                                                            setNameCompany(
                                                                event.target
                                                                    .value
                                                            );
                                                        }}
                                                    />
                                                </div>
                                                <div className="Register__content__form__item col-12 mt-3">
                                                    <TextField
                                                        fullWidth
                                                        required
                                                        id="addressCompany"
                                                        label="Address Company"
                                                        name="addressCompany"
                                                        autoComplete="addressCompany"
                                                        value={addressCompany}
                                                        onChange={(event) => {
                                                            setAddressCompany(
                                                                event.target
                                                                    .value
                                                            );
                                                        }}
                                                    />
                                                </div>
                                                <div className="Register__content__form__item col-12 mt-3">
                                                    <TextField
                                                        fullWidth
                                                        required
                                                        id="phoneCompany"
                                                        label="Phone Company"
                                                        name="phoneCompany"
                                                        autoComplete="phoneCompany"
                                                        value={phoneCompany}
                                                        onChange={(event) => {
                                                            setPhoneCompany(
                                                                event.target
                                                                    .value
                                                            );
                                                            setIsErrPhoneNumberCompany(false)
                                                        }}
                                                        // type="number"
                                                        error={isErrPhoneNumberCompany}
                                                    />
                                                </div>
                                                <div className="Register__content__form__item col-12 mt-3">
                                                    <TextField
                                                        fullWidth
                                                        required
                                                        id="emailCompany"
                                                        label="Email Company"
                                                        name="emailCompany"
                                                        autoComplete="emailCompany"
                                                        value={emailCompany}
                                                        onChange={(event) => {
                                                            setEmailCompany(
                                                                event.target.value
                                                            );
                                                            setIsErrEmailCompany(false)
                                                        }}
                                                        error={isErrEmailCompany}
                                                    />
                                                </div>
                                                <div className="Register__content__form__item col-12 mt-3">
                                                    <p>Specialization</p>
                                                    <Select
                                                      fullWidth
                                                      required
                                                      id="specialization"
                                                      value={specializationName}
                                                      label="Specialization"
                                                      onChange={(event) => {
                                                          setSpecializationName(event.target.value)
                                                      }}
                                                    >
                                                        {specializationList.length > 0 && specializationList.map((value, key) => {
                                                            return (<MenuItem key={key} value={value}>{value}</MenuItem>)
                                                        })}
                                                    </Select>
                                                </div>
                                                <div className="Register__content__form__item col-12 mt-3">
                                                    <div>Select day of week can tranning</div>
                                                    <FormControlLabel control={<Checkbox onChange={(e) => selectDayOfWeek(e, 1)} />} label="Monday" style={{marginRight: 40}}/>
                                                    <FormControlLabel control={<Checkbox onChange={(e) => selectDayOfWeek(e, 2)} />} label="Tuesday" style={{marginRight: 40}}/>
                                                    <FormControlLabel control={<Checkbox onChange={(e) => selectDayOfWeek(e, 3)} />} label="Wednesday" style={{marginRight: 40}}/>
                                                    <FormControlLabel control={<Checkbox onChange={(e) => selectDayOfWeek(e, 4)} />} label="Thursday" style={{marginRight: 40}}/>
                                                    <FormControlLabel control={<Checkbox onChange={(e) => selectDayOfWeek(e, 5)} />} label="Friday" style={{marginRight: 40}}/>
                                                    <FormControlLabel control={<Checkbox onChange={(e) => selectDayOfWeek(e, 6)} />} label="Saturday" style={{marginRight: 40}}/>
                                                    <FormControlLabel control={<Checkbox onChange={(e) => selectDayOfWeek(e, 7)} />} label="Sunday" />
                                                </div>
                                                <div className="Register__content__form__item col-12 mt-3">
                                                    <TextField
                                                      fullWidth
                                                      required
                                                      id="price"
                                                      label="Price ( $ )"
                                                      name="price"
                                                      autoComplete="price"
                                                      value={price}
                                                      onChange={(event) => {
                                                          setPrice(
                                                            event.target.value
                                                          );
                                                      }}
                                                      type="number"
                                                    />
                                                </div>
                                            </>
                                        )}
                                        <div className="Register__content__form__item col-6 mt-3">
                                            <LocalizationProvider
                                                dateAdapter={AdapterDateFns}
                                            >
                                                <DatePicker
                                                    label="Date of birth"
                                                    value={dateOfBirth}
                                                    inputFormat="yyyy/MM/dd"
                                                    onChange={(value) => {
                                                        setDateOfBirth(
                                                            moment(
                                                                value
                                                            ).format(
                                                                "YYYY-MM-DD"
                                                            )
                                                        );
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                        />
                                                    )}
                                                />
                                            </LocalizationProvider>
                                        </div>
                                        <div className="Register__content__form__item col-6 mt-3">
                                            <span>Gender</span>
                                            <RadioGroup
                                                aria-labelledby="gender-group"
                                                name="gender-group"
                                                value={gender}
                                                onChange={(event) => {
                                                    setGender(
                                                        event.target.value
                                                    );
                                                }}
                                                row
                                            >
                                                <FormControlLabel
                                                    value="female"
                                                    control={<Radio />}
                                                    label="Female"
                                                />
                                                <FormControlLabel
                                                    value="male"
                                                    control={<Radio />}
                                                    label="Male"
                                                />
                                            </RadioGroup>
                                        </div>
                                        <div className="Register__content__form__item col-12 mt-3">
                                            <Button
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                className="Register__content__form__button"
                                                onClick={handleSubmit}
                                            >
                                                Register
                                            </Button>
                                            <Typography
                                                variant="body2"
                                                color="textSecondary"
                                                align="center"
                                                className="mt-3"
                                            >
                                                {"Do you have an account? "}
                                                <Link
                                                    href="/login"
                                                    variant="body2"
                                                >
                                                    Sign In
                                                </Link>
                                            </Typography>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="pt-2 d-flex justify-content-between w-100">
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    variant="contained"
                                >
                                    Back
                                </Button>
                                <Button
                                  variant="contained"
                                  onClick={handleNext}
                                  disabled={activeStep === 1}
                                >
                                    Next
                                </Button>

                            </div>
                            <div className="pt-2 d-flex justify-content-between w-50 mt-4">
                                <Button
                                  fullWidth
                                  onClick={() => navigate(PATHS.HOME)}
                                  variant="contained"
                                >
                                    Go to homepage
                                </Button>
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </>
    );
};
export default Register;
