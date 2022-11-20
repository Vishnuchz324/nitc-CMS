import * as React from "react";
import "../styles/members.style.css";
import { Box } from "@mui/material";
const Members = () => {
	return (
		<div className='main1'>
			<Box
				component='main'
				sx={{ alignItems: "center", justifyContent: "center" }}
			>
				{/* Member page */}

				<div class='container'>
					<div class='row vh-100'>
						<div class='col-sm-6 col-lg-3 my-auto'>
							<div class='box shadow-sm p-4'>
								<div class='image-wrapper mb-3'>
									<img class='img-fluid' src='../../Sha.webp' alt='...' />
								</div>
								<div class='box-desc'>
									<h5>Shada Faisal</h5>
									<p>B190180CS</p>
								</div>
								<ul class='social'>
									<li>
										<a href='https://github.com/shada-01'>
											<i class='fa fa-github'></i>
										</a>
									</li>
									<li>
										<a href='https://www.linkedin.com/in/shada-faisal-84327018b/'>
											<i class='fa fa-linkedin'></i>
										</a>
									</li>
									<li>
										<a href='https://mail.google.com/mail/?view=cm&fs=1&to=shada_b190180cs@nitc.ac.in&su=SUBJECT&body=BODY'>
											<i class='fa fa-envelope'></i>
										</a>
									</li>
									<li>
										<a
											href='../../Shada_Resume.pdf'
											download='Shada_Resume.pdf'
											target='_blank'
										>
											<i class='fa fa-file-text-o'></i>
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div class='col-sm-6 col-lg-3 my-auto'>
							<div class='box shadow-sm p-4'>
								<div class='image-wrapper mb-3'>
									<img class='img-fluid' src='../../Rose.webp' alt='...' />
								</div>
								<div class='box-desc'>
									<h5>Rose S Jose</h5>
									<p>B190839CS</p>
								</div>
								<ul class='social'>
									<li>
										<a href='https://github.com/RoseSJose'>
											<i class='fa fa-github'></i>
										</a>
									</li>
									<li>
										<a href='https://www.linkedin.com/in/rose-s-jose-472527190/'>
											<i class='fa fa-linkedin'></i>
										</a>
									</li>
									<li>
										<a href='https://mail.google.com/mail/?view=cm&fs=1&to=rose_b190839cs@nitc.ac.in&su=SUBJECT&body=BODY'>
											<i class='fa fa-envelope'></i>
										</a>
									</li>
									<li>
										<a
											href='../../Rose_Resume.pdf'
											download='Rose_Resume.pdf'
											target='_blank'
										>
											<i class='fa fa-file-text-o'></i>
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div class='col-sm-6 col-lg-3 my-auto'>
							<div class='box shadow-sm p-4'>
								<div class='image-wrapper mb-3'>
									<img class='img-fluid' src='../../C.webp' alt='...' />
								</div>
								<div class='box-desc'>
									<h5>Vishnu C</h5>
									<p>B190402CS</p>
								</div>
								<ul class='social'>
									<li>
										<a href='https://github.com/Vishnuchz324'>
											<i class='fa fa-github'></i>
										</a>
									</li>
									<li>
										<a href='https://www.linkedin.com/in/vishnu-cheruvakkad-964bb818a/'>
											<i class='fa fa-linkedin'></i>
										</a>
									</li>
									<li>
										<a href='https://mail.google.com/mail/?view=cm&fs=1&to=vishnu_b190402cs@nitc.ac.in&su=SUBJECT&body=BODY'>
											<i class='fa fa-envelope'></i>
										</a>
									</li>
									<li>
										<a
											href='../../Vishnu_Resume.pdf'
											download='Vishnu_Resume.pdf'
											target='_blank'
										>
											<i class='fa fa-file-text-o'></i>
										</a>
									</li>
								</ul>
							</div>
						</div>
						<div class='col-sm-6 col-lg-3 my-auto'>
							<div class='box shadow-sm p-4'>
								<div class='image-wrapper mb-3'>
									<img class='img-fluid' src='../../G.webp' alt='...' />
								</div>
								<div class='box-desc'>
									<h5>Ganesh G</h5>
									<p>B190466CS</p>
								</div>
								<ul class='social'>
									<li>
										<a href='https://github.com/ganeshgopan'>
											<i class='fa fa-github'></i>
										</a>
									</li>
									<li>
										<a href='https://www.linkedin.com/in/ganesh-gopan/'>
											<i class='fa fa-linkedin'></i>
										</a>
									</li>
									<li>
										<a href='https://mail.google.com/mail/?view=cm&fs=1&to=ganesh_b190466cs@nitc.ac.in&su=SUBJECT&body=BODY'>
											<i class='fa fa-envelope'></i>
										</a>
									</li>
									<li>
										<a
											href='../../Ganesh_Resume.pdf'
											download='Ganesh_Resume.pdf'
											target='_blank'
										>
											<i class='fa fa-file-text-o'></i>
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</Box>
		</div>
	);
};

export default Members;
