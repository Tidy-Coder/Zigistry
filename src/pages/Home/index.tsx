import { useState, useEffect } from 'preact/hooks';
import { Button, Card, TextInput } from 'flowbite-react';
import { FaStar, FaEye } from "react-icons/fa";
import { GoIssueOpened } from "react-icons/go";
import { FaCodeFork } from "react-icons/fa6";

export function Home() {
	const [repository, setRepository] = useState(null);
	useEffect(() => {
		(async () => {
			try {
				const response = await fetch("https://raw.githubusercontent.com/RohanVashisht1234/zigistry/main/database/main.json");
				if (!response.ok) throw new Error(`Error: ${response.statusText}`);
				const data = await response.json();
				setRepository(data.items);
			} catch (error) {
				console.error('Fetch error:', error);
			}
		})();
	}, []);

	return (
		<div className="flex flex-col items-center">
			<h1 className="text-center font-semibold text-2xl my-5">Search Ziglang Packages</h1>
			<TextInput placeholder="Search libraries" id="base" type="text" sizing="md" className="w-72 mb-5" />
			<div className="w-full flex flex-wrap justify-evenly">
				{repository ? (
					repository.map((item, index) => (
						<Card key={index} className="w-72 my-2 hover:scale-110 transition-transform transform-cpu">
							<img className="w-10 rounded-full" src={item.owner.avatar_url} alt={item.name} />
							<h5 className="text-2xl font-bold text-gray-900 dark:text-white">{item.name}</h5>
							<p className="text-gray-400">{item.full_name}</p>
							<p className="font-normal text-gray-700 dark:text-gray-400">{item.description}</p>
							<div className="flex items-center">
								<FaStar size={20} color='#cfbc0e' />&nbsp;{item.stargazers_count}
								&nbsp;&nbsp;&nbsp;&nbsp;<FaEye color="skyblue" />&nbsp;{item.watchers_count}
								&nbsp;&nbsp;&nbsp;&nbsp;<FaCodeFork color="lightpink" />&nbsp;{item.forks_count}
								&nbsp;&nbsp;&nbsp;&nbsp;<GoIssueOpened color="lightgreen" />&nbsp;{item.open_issues}
							</div>
							<Button href={item.full_name} color="dark" pill>
								View package
							</Button>
						</Card>
					))
				) : (
					<p>Loading...</p>
				)}
			</div>
		</div>
	);
}
