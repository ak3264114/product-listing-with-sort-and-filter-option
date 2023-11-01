import { useEffect, useState } from "react";
import "./App.css";
import ProductCard from "./components/ProductCard";
import data from "./data/productData.json";

function App() {
	const [productData, setProductData] = useState([]);
	const [hasNext, setHasNext] = useState(false);
	const [pageNo, setPageNo] = useState(1);
	const [category, setCategory] = useState(null);
	const [sortBy, setSortBy] = useState(null);
	useEffect(() => {
		let products = data.products;

		if (category) {
			products = products.filter((product) => product.category === category);
		}

		if (sortBy === "price-asc") {
			products = products.slice().sort((a, b) => a.price - b.price);
		} else if (sortBy === "price-desc") {
			products = products.slice().sort((a, b) => b.price - a.price);
		}

		const endIndex = Math.min(data.products.length, pageNo * 10);
		const slicedProducts = products.slice((pageNo - 1) * 10, endIndex);
		setProductData(slicedProducts);

		setHasNext(endIndex < products.length);
	}, [pageNo, category, sortBy]);

	const handlePageNoChange = () => {
		if (hasNext) {
			setPageNo(pageNo + 1);
		}
	};

	const handleCategoryChange = (e) => {
		setCategory(e.target.value);
		setPageNo(1);
	};

	const handleSortBy = (e) => {
		setSortBy(e.target.value);
		setPageNo(1);
	};

	const goToPreviousPage = () => {
		if (pageNo > 1) {
			setPageNo(pageNo - 1);
			setHasNext(true);
		}
	};

	return (
		<>
			<div className="text-center  sticky top-0 z-10 bg-gray-50 border-b border-black py-5">
				<div className="font-bold text-3xl">Product Listing Page</div>

				<div className="flex flex-col sm:flex-row justify-center items-center">
					<div className="mx-2 flex flex-col sm:flex-row  items-center">
						<label className="mr-2">Filter by Category:</label>
						<select
							value={category}
							onChange={(e) => {
								handleCategoryChange(e);
							}}
							className="p-2 border border-gray-300 rounded"
						>
							<option value="">All</option>
							<option value="smartphones">smartphones</option>
							<option value="laptops">laptops</option>
							<option value="fragrances">fragrances</option>
							<option value="skincare">skincare</option>
							<option value="groceries">groceries</option>
							<option value="home-decoration">home-decoration</option>
						</select>
					</div>
					<div className="mx-2 flex flex-col sm:flex-row  items-center">
						<label className="mr-2">Sort by Price:</label>
						<select
							value={sortBy}
							onChange={(e) => {
								handleSortBy(e);
							}}
							className="p-2 border border-gray-300 rounded"
						>
							<option value="">None</option>
							<option value="price-asc">Price: Low to High</option>
							<option value="price-desc">Price: High to Low</option>
						</select>
					</div>
				</div>
			</div>

			<div className="bg-gradient-to-tr from-red-500 to-blue-500 pt-3">
				<div className="flex justify-center min-h-screen">
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						{productData.map((item, index) => (
							<div className="" key={index}>
								<ProductCard {...item} />
							</div>
						))}
					</div>
				</div>
				<div className="flex justify-end items-center py-4 mr-4">
					<button
						onClick={goToPreviousPage}
						disabled={pageNo === 1}
						className={`  px-4  py-2 rounded bg-gradient-to-tr bg-theme-yellow to-theme-yellow from-theme-red ${
							pageNo === 1 ? "opacity-50 cursor-not-allowed" : ""
						}`}
					>
						Previous
					</button>
					<span className="mx-2 py-2 px-4 border">{pageNo}</span>
					<button
						className={`rounded px-4 py-2 bg-gradient-to-tr bg-theme-yellow to-theme-yellow from-theme-red ${
							!hasNext ? "opacity-50 cursor-not-allowed " : "hover:bg-blue-600"
						}`}
						onClick={handlePageNoChange}
						disabled={!hasNext}
					>
						Next
					</button>
				</div>
			</div>
		</>
	);
}

export default App;
