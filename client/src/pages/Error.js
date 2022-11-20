import React from "react";
import "../styles/error.style.css";

const ErrorPage = () => {
	return (
		<div className='main-container'>
			<div className='mainbox'>
				<div className='err'>4</div>
				<i className='far fa-question-circle fa-spin'></i>
				<div className='err2'>4</div>
				<div className='msg'>
					Page not found
					<p>
						Let's go <a href='../login'>Login</a> and try from there.
					</p>
				</div>
			</div>
		</div>
	);
};

export default ErrorPage;
