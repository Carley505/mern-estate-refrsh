import React, { useEffect, useState } from "react";
import BicycleItem from "../components/BicycleItem";
import { useNavigate } from "react-router-dom";

export default function SearchPage() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    category: "all",
    group: "all",
    condition: "very good",
    offer: false,
    sort: "created_at",
    order: "desc",
  });

  console.log(sidebarData);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [bicycles, setBicycles] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const categoryFromUrl = urlParams.get("category");
    const groupFromUrl = urlParams.get("group");
    const conditionFromUrl = urlParams.get("condition");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      categoryFromUrl ||
      groupFromUrl ||
      conditionFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        category: categoryFromUrl || "all",
        group: groupFromUrl || "all",
        condition: conditionFromUrl || "very good",
        sort: sortFromUrl || "created_at",
        order: orderFromUrl || "desc",
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/bicycle/search?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setBicycles(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, checked, value } = e.target;
  
    // Type Section
    if (id === "type_all" || id === "rent" || id === "sale") {
      setSidebarData({ ...sidebarData, type: id.replace("type_", "") });
    }

    // Type Section
    if (id === "group_all" || id === "kid" || id === "adult") {
      setSidebarData({ ...sidebarData, group: id.replace("group_", "") });
    }
  
    // Category Section
    if (id === "category_all" || id === "mountain" || id === "hybrid" || id === "road" || id === "electric") {
      setSidebarData({ ...sidebarData, category: id.replace("category_", "") });
    }
  
    // Offer Checkbox
    if (id === "offer") {
      setSidebarData({ ...sidebarData, offer: checked });
    }
  
    // Search Term
    if (id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: value });
    }
  
    // Sort Order
    if (id === "sort_order") {
      const [sort, order] = value.split("_");
      setSidebarData({ ...sidebarData, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("type", sidebarData.type);
    urlParams.set("category", sidebarData.category);
    urlParams.set("group", sidebarData.group);
    urlParams.set("condition", sidebarData.condition);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("order", sidebarData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = bicycles.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setBicycles([...bicycles, ...data]);
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search our Web..."
              className="border rounded-lg p-3 w-full"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="type_all"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          {/* ====== Category ===== */}
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Category:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="category_all"
                className="w-5"
                onChange={handleChange}
                checked={(sidebarData.category === "all")}
              />
              <span>All</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="mountain"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.category === "mountain"}
              />
              <span>Mountain</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="hybrid"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.category === "hybrid"}
              />
              <span>Hybrid</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="road"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.category === "road"}
              />
              <span>Road</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="electric"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.category === "electric"}
              />
              <span>Electric</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Group:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="group_all"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.group === "all"}
              />
              <span>All</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="kid"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.group === "kid"}
              />
              <span>Kids</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="adult"
                className="w-5"
                onChange={handleChange}
                checked={sidebarData.group === "adult"}
              />
              <span>Adult</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              id="sort_order"
              className="border rounded-lg p-3"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to hight</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && bicycles.length === 0 && (
            <p className="text-xl text-slate-700">No bicycle found!</p>
          )}
          {loading && (
            <p className="text-xl text-slate-700 text-center w-full">
              Loading...
            </p>
          )}

          {!loading &&
            bicycles &&
            bicycles.map((bicycle) => (
              <BicycleItem key={bicycle._id} bicycle={bicycle} />
            ))}

          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="text-green-700 hover:underline p-7 text-center w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
