import { useState, useEffect } from 'react';
import { silentUpdate } from './utils';

const Rows = 2;

const Columns = 2;

const Cameras = [
	{
		name: 'Living Room',
		id: 'living-room',
	},
	{
		name: 'Kitchen',
		id: 'kitchen',
	},
	{
		name: 'Front Door',
		id: 'front-door',
	},
];

const FeedComponent = ({ feed, selectFeed, fullScreen, exitFullscreen }) => {
	return feed ? (
		<div
			onClick={!fullScreen ? () => selectFeed(feed) : () => null}
			style={
				fullScreen
					? {
							height: '100vh',
							width: '100vw',
					  }
					: {
							width: 100 / Rows + 'vw',
							position: 'relative',
							cursor: 'pointer',
					  }
			}
		>
			<div
				style={{
					position: 'absolute',
					padding: '0',
					fontWeight: '700',
					fontSize: '30px',
					color: '#eee',
					zIndex: '200',
					top: '0',
					width: '140px',
					height: '40px',
					display: 'flex',
					alignItems: 'center',
					margin: '25px',
					backgroundColor: 'rgba(0, 0, 0, 0.8)',
					justifyContent: 'center',
				}}
			>
				<p
					style={{
						margin: '0',
						padding: '0',
						fontWeight: '700',
						fontSize: '20px',
						color: '#eee',
					}}
				>
					{feed.name}
				</p>
			</div>

			{fullScreen && (
				<div
					style={{
						position: 'absolute',
						margin: '0',
						padding: '0',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontWeight: '700',
						fontSize: '30px',
						color: '#eee',
						zIndex: '200',
						bottom: '0',
						width: '100%',
						height: '80px',
						backgroundColor: 'rgba(0, 0, 0, 0.8)',
					}}
				>
					<div>
						<a
							href='#'
							onClick={exitFullscreen}
							style={{
								color: '#eee',
								textDecoration: 'none',
							}}
						>
							Exit
						</a>
					</div>
				</div>
			)}

			<div
				style={{
					height: '100%',
					width: '100%',
					backgroundImage:
						"url('https://www.cctvcamerapros.com/v/4K/4K-security-camera-snapshot.jpg')",
					backgroundSize: '100% 100%',
				}}
			></div>
		</div>
	) : (
		<div
			style={{
				width: 100 / Rows + 'vw',
				height: '100%',
				backgroundColor: 'black',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				color: '#eee',
			}}
		>
			<h1
				style={{
					margin: '0',
					padding: '0',
					fontStyle: 'italic',
				}}
			>
				No Feed.
			</h1>
		</div>
	);
};

function App() {
	const [FullScreen, setFullScreen] = useState(false);

	const [SelectedFeed, setSelectedFeed] = useState(null);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);

		const feed = params.get('feed');

		if (feed)
			Cameras.map((camera) => {
				if (camera.id == feed) {
					setFullScreen(true);
					setSelectedFeed(camera);
				}
			});
	}, []);

	return !FullScreen ? (
		<div
			style={{ height: '100vh', width: '100vw', backgroundColor: 'gray' }}
		>
			{[...Array(Columns)].map((_, column) => {
				return (
					<div
						className={'column-' + (column + 1)}
						style={{
							height: 100 / Columns + 'vh',
							width: '100vw',
							display: 'flex',
						}}
					>
						{[...Array(Rows)].map((_, row) => {
							let feed;

							if (column == 0 && row == 0) feed = Cameras[0];
							else if (column == 0 && row == 1) feed = Cameras[1];
							else if (column == 1 && row == 0) feed = Cameras[2];

							return (
								<FeedComponent
									feed={feed}
									selectFeed={(feed) => {
										setSelectedFeed(feed);
										silentUpdate('/?feed=' + feed.id);
										setFullScreen(true);
									}}
								/>
							);
						})}
					</div>
				);
			})}
		</div>
	) : (
		<FeedComponent
			fullScreen
			feed={SelectedFeed}
			exitFullscreen={(e) => {
				e.preventDefault();

				setFullScreen(false);

				silentUpdate('/');
			}}
		/>
	);
}

export default App;
