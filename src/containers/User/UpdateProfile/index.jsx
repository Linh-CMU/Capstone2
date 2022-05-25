import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import {MenuItem} from "@mui/material";
import {Select} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import moment from "moment";
import images from "../../../assets/images";
import "./_UpdateProject.scss";
import Alert, { notify } from "../../../components/Common/Alert";
import API from "../../../api";
import Utils from "../../../libs/Utils";
import {useNavigate} from "react-router-dom";
import Loading from "../../../components/Common/Loading";
import LayoutUser from "../LayoutUser";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const UpdateProfile = () => {
	let navigate = useNavigate();
	const [achievementsRequest, setAchievementsRequest] = useState({
		description: "",
		nameAchieved: "",
		timeAchieved: moment(new Date()).format("YYYY-MM-DD")
	});
	const [educationRequests, setEducationRequests] = useState({
		major: "",
		nameEducation: "",
		scoreEducation: "",
		timeEnd: moment(new Date()).format("YYYY-MM-DD"),
		timeStart: moment(new Date()).format("YYYY-MM-DD")
	});
	const [hobbiesRequest, setHobbiesRequest] = useState({
		description: "",
		nameHobbies: ""
	});
	const [nameSpecialization, setNameSpecialization] = useState("Developer Full Stack")
	const [profileRequest, setProfileRequest] = useState({
		dateOfBirth: moment(new Date()).format("YYYY-MM-DD"),
		addressOfUser: "",
		name: "",
		email: "",
		numberPhone: "",
		gender: "",
		description: "",
		linkProfile: ""
	})
	const [publicationsRequest, setPublicationsRequest] = useState({
		description: "",
		namePublications: "",
		numberMember: "",
		timeEnd: moment(new Date()).format("YYYY-MM-DD"),
		timeStart: moment(new Date()).format("YYYY-MM-DD")
	});
	const [workExperienceRequest, setWorkExperienceRequest] = useState({
		description: "",
		nameWork: "",
		position: "",
		timeEnd: moment(new Date()).format("YYYY-MM-DD"),
		timeStart: moment(new Date()).format("YYYY-MM-DD")
	});
	const [specializationList, setSpecializationList] = useState([])
	const [skillRequestList, setSkillRequestList] = useState([])
	const [isLoading, setIsLoading] = useState(false);
	const [activeStep, setActiveStep] = useState(0);
	const [skipped, setSkipped] = useState(new Set());

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

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (
			!achievementsRequest.nameAchieved ||
			!achievementsRequest.description ||
			!educationRequests.major ||
			!educationRequests.nameEducation ||
			!educationRequests.scoreEducation ||
			!hobbiesRequest.nameHobbies ||
			!hobbiesRequest.description ||
			!profileRequest.name ||
			!profileRequest.numberPhone ||
			!profileRequest.gender ||
			!profileRequest.dateOfBirth ||
			!profileRequest.addressOfUser ||
			!publicationsRequest.namePublications ||
			!publicationsRequest.description ||
			!publicationsRequest.numberMember ||
			!skillRequestList[0] ||
			!workExperienceRequest.nameWork ||
			!workExperienceRequest.description ||
			!workExperienceRequest.position
		) {
			notify("Please fill out the information completely", "warring");
		} else {
			const dataForm = {
				achievementsRequest,
				educationRequests,
				hobbiesRequest,
				nameSpecialization,
				profileRequest,
				publicationsRequest,
				skillRequestList,
				workExperienceRequest
			}
			setIsLoading(true)
			await API.updateProfile(dataForm)
				.then(async (res) => {
					setIsLoading(false)
					if (res.status === 200) {
						Utils.popupAlert({
							title: 'Update profile successfully!',
							type: 'success',
						})
						setActiveStep(0)
					}
				}).catch((e) => {
					Utils.popupAlert({ title: 'Oops...', text: 'Error Login', type: 'error' });
					setIsLoading(false)
				});
		}
	}

	const getInitData = async () => {
		setIsLoading(true)
		await API.getProfile()
			.then(async (res) => {
				setIsLoading(false)
				if (res.status === 200) {
					const {curriculumVitaeResource, specializationList, userResource} = res.data
					if (specializationList) {
						setSpecializationList(specializationList.data)
					}
					if (!curriculumVitaeResource && userResource) {
						setProfileRequest({
							...profileRequest,
							linkProfile: userResource.linkProfile,
							description: userResource.description,
							dateOfBirth: userResource.dateOfBirth,
							addressOfUser: userResource.addressOfUser,
							name: userResource.firstName + ' ' + userResource.lastName,
							email: userResource.email,
							numberPhone: userResource.numberPhone,
							gender: userResource.gender,
						});
					}
					if (curriculumVitaeResource) {
						if (curriculumVitaeResource.achievementsResource) {
							setAchievementsRequest({
								...achievementsRequest,
								nameAchieved: curriculumVitaeResource.achievementsResource.nameAchieved,
								description: curriculumVitaeResource.achievementsResource.description,
								timeAchieved: curriculumVitaeResource.achievementsResource.timeAchieved
							});
						}
						if (curriculumVitaeResource.educationResources) {
							setEducationRequests({
								...educationRequests,
								major: curriculumVitaeResource.educationResources.major,
								nameEducation: curriculumVitaeResource.educationResources.nameEducation,
								scoreEducation: curriculumVitaeResource.educationResources.scoreEducation,
								timeStart: curriculumVitaeResource.educationResources.timeStart,
								timeEnd: curriculumVitaeResource.educationResources.timeEnd
							});
						}
						if (curriculumVitaeResource.hobbiesResource) {
							setHobbiesRequest({
								...hobbiesRequest,
								nameHobbies: curriculumVitaeResource.hobbiesResource.nameHobbies,
								description: curriculumVitaeResource.hobbiesResource.description
							});
						}
						if (curriculumVitaeResource.specializationResource) {
							setNameSpecialization(curriculumVitaeResource.specializationResource.name);
						}
						if (curriculumVitaeResource.profileResource) {
							setProfileRequest({
								...profileRequest,
								linkProfile: curriculumVitaeResource.profileResource.linkProfile,
								description: curriculumVitaeResource.profileResource.description,
								dateOfBirth: curriculumVitaeResource.profileResource.dateOfBirth,
								addressOfUser: curriculumVitaeResource.profileResource.addressOfUser,
								name: curriculumVitaeResource.profileResource.name,
								email: curriculumVitaeResource.profileResource.email,
								numberPhone: curriculumVitaeResource.profileResource.numberPhone,
								gender: curriculumVitaeResource.profileResource.gender,
							});
						}
						if (curriculumVitaeResource.publicationsResource) {
							setPublicationsRequest({
								...publicationsRequest,
								namePublications: curriculumVitaeResource.publicationsResource.namePublications,
								description: curriculumVitaeResource.publicationsResource.description,
								numberMember: curriculumVitaeResource.publicationsResource.numberMember,
								timeStart: curriculumVitaeResource.publicationsResource.timeStart,
								timeEnd: curriculumVitaeResource.publicationsResource.timeEnd
							});
						}
						if (curriculumVitaeResource.workExperienceResource) {
							setWorkExperienceRequest({
								...workExperienceRequest,
								nameWork: curriculumVitaeResource.workExperienceResource.nameWork,
								description: curriculumVitaeResource.workExperienceResource.description,
								position: curriculumVitaeResource.workExperienceResource.position,
								timeStart: curriculumVitaeResource.workExperienceResource.timeStart,
								timeEnd: curriculumVitaeResource.workExperienceResource.timeEnd
							});
						}
						if (curriculumVitaeResource.skillResource) {
							setSkillRequestList([curriculumVitaeResource.skillResource[0]]);
						}
					}
				}
			}).catch((e) => {
				Utils.popupAlert({ title: 'Oops...', text: 'Error Login', type: 'error' });
				setIsLoading(false)
			});
	}

	useEffect(() => {
		const getInitDataEffect = async () => {
			await getInitData()
		}
		getInitDataEffect()
	}, [])

	return (
		<LayoutUser title={'Update profile'}>
			{isLoading && <Loading />}
			<Alert />
			<div style={{display: "flex"}}>
				<div className="UpdateProfile UpdateProfile__container">
					<CssBaseline />
					<div className="UpdateProfile__content">
						<React.Fragment>
							<div className="UpdateProfile__content__logo">
								<img
									src={images.Logo}
									alt="logo"
									width={200}
									height={100}
								/>
							</div>
							<p style={{ fontSize: 25, fontWeight: 'bold'}}>Update Profile</p>
							<div className="UpdateProfile__content__form row mt-4 w-100">
								{activeStep == 0 && (
									<div className="UpdateProfile__content__form__item col-12">
										<p className='mt-4'>Profile:</p>
										<TextField
											name="email"
											required
											fullWidth
											id="email"
											label="Email"
											autoFocus
											value={profileRequest.email}
											disabled={true}
										/>
										<TextField
											className="mt-3"
											name="name"
											required
											fullWidth
											id="name"
											label="Name"
											autoFocus
											value={profileRequest.name}
											onChange={(event) => {
												setProfileRequest({
													...profileRequest,
													name: event.target.value
												});
											}}
										/>
										<TextField
											className="mt-3"
											name="numberPhone"
											required
											fullWidth
											id="numberPhone"
											label="Number phone"
											autoFocus
											value={profileRequest.numberPhone}
											onChange={(event) => {
												setProfileRequest({
													...profileRequest,
													numberPhone: event.target.value
												});
											}}
										/>
										<TextField
											className="mt-3"
											name="addressOfUser"
											required
											fullWidth
											id="addressOfUser"
											label="Address"
											autoFocus
											value={profileRequest.addressOfUser}
											onChange={(event) => {
												setProfileRequest({
													...profileRequest,
													addressOfUser: event.target.value
												});
											}}
										/>
										<LocalizationProvider
											dateAdapter={AdapterDateFns}
										>
											<DatePicker
												label="Date of birth"
												value={profileRequest.dateOfBirth}
												inputFormat="yyyy/MM/dd"
												maxDate={new Date()}
												onChange={(value) => {
													setProfileRequest({
														...profileRequest,
														dateOfBirth: moment(value).format("YYYY-MM-DD")
													});
												}}
												renderInput={(params) => (
													<TextField
														className="mt-3"
														fullWidth
														{...params}
													/>
												)}
											/>
										</LocalizationProvider>
										<TextField
											className="mt-3"
											name="linkProfile"
											fullWidth
											id="linkProfile"
											label="Link Profile"
											autoFocus
											value={profileRequest.linkProfile}
											onChange={(event) => {
												setProfileRequest({
													...profileRequest,
													linkProfile: event.target.value
												});
											}}
										/>
										<div className='pt-3'>Gender</div>
										<RadioGroup
											aria-labelledby="gender-group"
											name="gender-group"
											value={profileRequest.gender}
											onChange={(event) => {
												setProfileRequest({
													...profileRequest,
													gender: event.target.value
												});
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
										<TextField
											className="mt-3"
											name="description"
											fullWidth
											id="description"
											label="Description"
											autoFocus
											value={profileRequest.description}
											onChange={(event) => {
												setProfileRequest({
													...profileRequest,
													description: event.target.value
												});
											}}
											inputProps={{
												style: {
													paddingBottom: "100px",
												},
											}}
										/>
									</div>
								)}
								{activeStep == 1 && (
									<div className="UpdateProfile__content__form__item col-12">
										<p>Achievement:</p>
										<TextField
											name="nameAchieved"
											required
											fullWidth
											id="nameAchieved"
											label="Name achieved"
											autoFocus
											value={achievementsRequest.nameAchieved}
											onChange={(event) => {
												setAchievementsRequest({
													...achievementsRequest,
													nameAchieved: event.target.value
												});
											}}
										/>
										<TextField
											className="mt-3"
											name="description"
											required
											fullWidth
											id="description"
											label="Description achieved"
											autoFocus
											value={achievementsRequest.description}
											onChange={(event) => {
												setAchievementsRequest({
													...achievementsRequest,
													description: event.target.value
												});
											}}
											inputProps={{
												style: {
													paddingBottom: "100px",
												},
											}}
										/>
										<LocalizationProvider
											dateAdapter={AdapterDateFns}
										>
											<DatePicker

												label="Time achieved"
												value={achievementsRequest.timeAchieved}
												inputFormat="yyyy/MM/dd"
												maxDate={new Date()}
												onChange={(value) => {
													setAchievementsRequest({
														...achievementsRequest,
														timeAchieved: moment(value).format("YYYY-MM-DD")
													});
												}}
												renderInput={(params) => (
													<TextField
														className="mt-3"
														fullWidth
														{...params}
													/>
												)}
											/>
										</LocalizationProvider>
									</div>
								)}
								{activeStep == 2 && (
									<div className="UpdateProfile__content__form__item col-12">
										<p className='mt-4'>Education:</p>
										<TextField
											name="major"
											required
											fullWidth
											id="major"
											label="Major"
											autoFocus
											value={educationRequests.major}
											onChange={(event) => {
												setEducationRequests({
													...educationRequests,
													major: event.target.value
												});
											}}
										/>
										<TextField
											className="mt-3"
											name="nameEducation"
											required
											fullWidth
											id="nameEducation"
											label="Name"
											autoFocus
											value={educationRequests.nameEducation}
											onChange={(event) => {
												setEducationRequests({
													...educationRequests,
													nameEducation: event.target.value
												});
											}}
										/>
										<TextField
											className="mt-3"
											name="scoreEducation"
											type="number"
											InputProps={{
												inputProps: {
													type: 'number',
													min: 0, max: 100,
												},
											}}
											required
											fullWidth
											id="scoreEducation"
											label="Score (max: 100)"
											autoFocus
											value={educationRequests.scoreEducation}
											onChange={(event) => {
												const valueScoreSet = event.target.value > 100 ? 100 : event.target.value
												setEducationRequests({
													...educationRequests,
													scoreEducation: valueScoreSet
												});
											}}
										/>
										<LocalizationProvider
											dateAdapter={AdapterDateFns}
										>
											<DatePicker
												label="Time start"
												value={educationRequests.timeStart}
												inputFormat="yyyy/MM/dd"
												maxDate={new Date()}
												onChange={(value) => {
													setEducationRequests({
														...educationRequests,
														timeStart: moment(value).format("YYYY-MM-DD")
													});
												}}
												renderInput={(params) => (
													<TextField
														className="mt-3"
														fullWidth
														{...params}
													/>
												)}
											/>
										</LocalizationProvider>
										<LocalizationProvider
											dateAdapter={AdapterDateFns}
										>
											<DatePicker
												label="Time end"
												value={educationRequests.timeEnd}
												inputFormat="yyyy/MM/dd"
												maxDate={new Date()}
												onChange={(value) => {
													setEducationRequests({
														...educationRequests,
														timeEnd: moment(value).format("YYYY-MM-DD")
													});
												}}
												renderInput={(params) => (
													<TextField
														className="mt-3"
														fullWidth
														{...params}
													/>
												)}
											/>
										</LocalizationProvider>
									</div>
								)}
								{activeStep == 3 && (
									<div className="UpdateProfile__content__form__item col-12">
										<p className='mt-4'>Hobby:</p>
										<TextField
											name="nameHobbies"
											required
											fullWidth
											id="nameHobbies"
											label="Name Hobby"
											autoFocus
											value={hobbiesRequest.nameHobbies}
											onChange={(event) => {
												setHobbiesRequest({
													...hobbiesRequest,
													nameHobbies: event.target.value
												});
											}}
										/>
										<TextField
											className="mt-3"
											name="description"
											required
											fullWidth
											id="description"
											label="Description"
											autoFocus
											value={hobbiesRequest.description}
											onChange={(event) => {
												setHobbiesRequest({
													...hobbiesRequest,
													description: event.target.value
												});
											}}
											inputProps={{
												style: {
													paddingBottom: "100px",
												},
											}}
										/>
									</div>
								)}
								{activeStep == 4 && (
									<div className="UpdateProfile__content__form__item col-12">
										<p className='mt-4'>Publication:</p>
										<TextField
											name="namePublications"
											required
											fullWidth
											id="namePublications"
											label="Name Publication"
											autoFocus
											value={publicationsRequest.namePublications}
											onChange={(event) => {
												setPublicationsRequest({
													...publicationsRequest,
													namePublications: event.target.value
												});
											}}
										/>
										<TextField
											className="mt-3"
											name="description"
											required
											fullWidth
											id="description"
											label="Description"
											autoFocus
											value={publicationsRequest.description}
											onChange={(event) => {
												setPublicationsRequest({
													...publicationsRequest,
													description: event.target.value
												});
											}}
											inputProps={{
												style: {
													paddingBottom: "100px",
												},
											}}
										/>
										<TextField
											className="mt-3"
											name="numberMember"
											type="number"
											required
											fullWidth
											id="numberMember"
											label="Number Member"
											autoFocus
											value={publicationsRequest.numberMember}
											onChange={(event) => {
												setPublicationsRequest({
													...publicationsRequest,
													numberMember: event.target.value
												});
											}}
										/>
										<LocalizationProvider
											dateAdapter={AdapterDateFns}
										>
											<DatePicker
												label="Time start"
												value={publicationsRequest.timeStart}
												inputFormat="yyyy/MM/dd"
												maxDate={new Date()}
												onChange={(value) => {
													setPublicationsRequest({
														...publicationsRequest,
														timeStart: moment(value).format("YYYY-MM-DD")
													});
												}}
												renderInput={(params) => (
													<TextField
														className="mt-3"
														fullWidth
														{...params}
													/>
												)}
											/>
										</LocalizationProvider>
										<LocalizationProvider
											dateAdapter={AdapterDateFns}
										>
											<DatePicker
												label="Time end"
												value={publicationsRequest.timeEnd}
												inputFormat="yyyy/MM/dd"
												maxDate={new Date()}
												onChange={(value) => {
													setPublicationsRequest({
														...publicationsRequest,
														timeEnd: moment(value).format("YYYY-MM-DD")
													});
												}}
												renderInput={(params) => (
													<TextField
														className="mt-3"
														fullWidth
														{...params}
													/>
												)}
											/>
										</LocalizationProvider>
									</div>
								)}
								{activeStep == 5 && (
									<div className="UpdateProfile__content__form__item col-12">
										<p className='mt-4'>Work Experience:</p>
										<TextField
											name="nameWork"
											required
											fullWidth
											id="nameWork"
											label="Name Work"
											autoFocus
											value={workExperienceRequest.nameWork}
											onChange={(event) => {
												setWorkExperienceRequest({
													...workExperienceRequest,
													nameWork: event.target.value
												});
											}}
										/>
										<TextField
											className="mt-3"
											name="description"
											required
											fullWidth
											id="description"
											label="Description"
											autoFocus
											value={workExperienceRequest.description}
											onChange={(event) => {
												setWorkExperienceRequest({
													...workExperienceRequest,
													description: event.target.value
												});
											}}
											inputProps={{
												style: {
													paddingBottom: "100px",
												},
											}}
										/>
										<TextField
											className="mt-3"
											name="position"
											required
											fullWidth
											id="position"
											label="Position"
											autoFocus
											value={workExperienceRequest.position}
											onChange={(event) => {
												setWorkExperienceRequest({
													...workExperienceRequest,
													position: event.target.value
												});
											}}
										/>
										<LocalizationProvider
											dateAdapter={AdapterDateFns}
										>
											<DatePicker
												label="Time start"
												value={workExperienceRequest.timeStart}
												inputFormat="yyyy/MM/dd"
												maxDate={new Date()}
												onChange={(value) => {
													setWorkExperienceRequest({
														...workExperienceRequest,
														timeStart: moment(value).format("YYYY-MM-DD")
													});
												}}
												renderInput={(params) => (
													<TextField
														className="mt-3"
														fullWidth
														{...params}
													/>
												)}
											/>
										</LocalizationProvider>
										<LocalizationProvider
											dateAdapter={AdapterDateFns}
										>
											<DatePicker
												label="Time end"
												value={workExperienceRequest.timeEnd}
												inputFormat="yyyy/MM/dd"
												maxDate={new Date()}
												onChange={(value) => {
													setWorkExperienceRequest({
														...workExperienceRequest,
														timeEnd: moment(value).format("YYYY-MM-DD")
													});
												}}
												renderInput={(params) => (
													<TextField
														className="mt-3"
														fullWidth
														{...params}
													/>
												)}
											/>
										</LocalizationProvider>
									</div>
								)}
								{activeStep == 6 && (
									<>
										<div className="UpdateProfile__content__form__item col-12">
											<p className='mt-4'>Specialization:</p>
											<Select
												fullWidth
												required
												id="specialization"
												value={nameSpecialization}
												label="Specialization"
												onChange={(event) => {
													setNameSpecialization(event.target.value)
												}}
											>
												{specializationList.length > 0 && specializationList.map((value, key) => {
													return (<MenuItem key={key} value={value}>{value}</MenuItem>)
												})}
											</Select>
										</div>
										<div className="UpdateProfile__content__form__item col-12">
											<p className='mt-4'>Skill:</p>
											<TextField
												name="skill"
												required
												fullWidth
												id="skill"
												label="Skill"
												autoFocus
												value={skillRequestList[0]}
												onChange={(event) => {
													setSkillRequestList([
														event.target.value
													]);
												}}
											/>
										</div>
									</>
								)}

								<div className="pt-4 d-flex justify-content-between w-100">
									<Button
										disabled={activeStep === 0}
										onClick={handleBack}
										variant="contained"
									>
										Back
									</Button>
									<Button
										onClick={handleNext}
										variant="contained"
										disabled={activeStep === 6}
									>
										Next
									</Button>
								</div>
								{activeStep === 6 && (
									<div className="UpdateProfile__content__form__item col-12 mt-3">
										<Button
											type="submit"
											fullWidth
											variant="contained"
											color="primary"
											className="UpdateProfile__content__form__button"
											onClick={handleSubmit}
										>
											Submit
										</Button>
									</div>
								)}
							</div>
						</React.Fragment>
					</div>
				</div>
				<div style={{width: 320, textAlign: "right", marginTop: "5em"}}>
					<img src={images.Adv} style={{height: 450}} alt="adv" />
				</div>
			</div>
		</LayoutUser>
	);
}

export default UpdateProfile
