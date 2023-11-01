import * as React from "react";

const ProductCard = ({
	title,
	thumbnail = "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
	stock,
	price,
	description,
	discountPercentage,
	category,
}) => {
	return (
		<div className="backdrop-filter backdrop-blur-lg bg-opacity-40 bg-gray-200 min-w-[50px] max-w-[300px] rounded-lg w-auto shadow hover:shadow-md relative">
			<div className="flex justify-center h-52">
				<img
					src={thumbnail}
					alt={title}
					className=" object-cover w-full  rounded-t-lg "
				/>
			</div>
			<div className="inline-block bg-gradient-to-tr from-blue-400 to-green-400 px-3 py-1 text-xs font-semibold text-white mr-2 mb-2 rounded absolute right-2 top-2">
				{category}
			</div>
			<div className=""></div>
			<div className="pb-4 px-6 pt-4">
				<div className="font-medium text-xl mb-2 truncate">{title}</div>
				{/* <div className="font-medium mb-2 ">{description}</div> */}

				<div className="text-bold font-medium text-base opacity-90">
					Available Qty : {stock}
				</div>
				<div className="pt-2">
					<span className="font-bold">₹ {price}</span> &nbsp;
					<span className=" text-green-800 font-medium">
						{discountPercentage}% off
					</span>
				</div>
			</div>
			{/* <a href={`/bike/${slug}`}>
				<button
					style={{
						backgroundColor: "#fed250",
						width: "100%",
						color: "black",
						width: "100%",
						borderRadius: "0px",
						textTransform: "none",
					}}
					variant="contained"
				>
					Book Now &nbsp;<span className="font-bold text-xl">@</span> &nbsp; ₹
					{price} / day
				</button>
			</a> */}
		</div>
	);
};

export default ProductCard;
