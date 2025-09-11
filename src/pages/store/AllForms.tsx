import React from "react";
import Button from "../../components/store/general/Button";
import AddItemModal from "../../components/store/forms/AddItemModal";

export default function AllForms() {
  return (
    <div className="pl-2 bg-gray-50">
      <div className="flex justify-between items-center mb-2 bg-[var(--base-color)] p-2">
        <h1 className="text-2xl font-bold text-[#035d67]">Store All Forms</h1>
      </div>
      <div className="flex items-center justify-between my-4 ml-2 flex-wrap ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {/* Example form card */}
          <div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-lg font-semibold text-[#035d67] mb-4">
              Add New Item
            </h2>
            <Button
              bgcolor="bg-white"
              border="border-3 border-[var(--dark-color)]"
              textColor="text-[var(--dark-color)]"
              name="Open"
              hover="hover:bg-gray-200"
            />
          </div>

          <div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-lg font-semibold text-[#035d67] mb-4">
              Add New Category
            </h2>
            <Button
              bgcolor="bg-white"
              border="border-3 border-yellow-800"
              textColor="text-yellow-800"
              name="Open"
              hover="hover:bg-gray-200"
            />
          </div>

          <div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-lg font-semibold text-[#035d67] mb-4">
              Add New Category
            </h2>
            <Button
              bgcolor="bg-white"
              border="border-3 border-yellow-800"
              textColor="text-yellow-800"
              name="Open"
              hover="hover:bg-gray-200"
            />
          </div>

          <div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-lg font-semibold text-[#035d67] mb-4">
              Add New Category
            </h2>
            <Button
              bgcolor="bg-white"
              border="border-3 border-yellow-800"
              textColor="text-yellow-800"
              name="Open"
              hover="hover:bg-gray-200"
            />
          </div>

          <div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-lg font-semibold text-[#035d67] mb-4">
              Add New Category
            </h2>
            <Button
              bgcolor="bg-white"
              border="border-3 border-yellow-800"
              textColor="text-yellow-800"
              name="Open"
              hover="hover:bg-gray-200"
            />
          </div>

          <div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-lg font-semibold text-[#035d67] mb-4">
              Add New Category
            </h2>
            <Button
              bgcolor="bg-white"
              border="border-3 border-yellow-800"
              textColor="text-yellow-800"
              name="Open"
              hover="hover:bg-gray-200"
            />
          </div>

          <div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-lg font-semibold text-[#035d67] mb-4">
              Add New Category
            </h2>
            <Button
              bgcolor="bg-white"
              border="border-3 border-yellow-800"
              textColor="text-yellow-800"
              name="Open"
              hover="hover:bg-gray-200"
            />
          </div>

          <div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-lg font-semibold text-[#035d67] mb-4">
              Add New Category
            </h2>
            <Button
              bgcolor="bg-white"
              border="border-3 border-yellow-800"
              textColor="text-yellow-800"
              name="Open"
              hover="hover:bg-gray-200"
            />
          </div>

          <div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-lg font-semibold text-[#035d67] mb-4">
              Add New Category
            </h2>
            <Button
              bgcolor="bg-white"
              border="border-3 border-yellow-800"
              textColor="text-yellow-800"
              name="Open"
              hover="hover:bg-gray-200"
            />
          </div>

          <div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-lg font-semibold text-[#035d67] mb-4">
              Add New Category
            </h2>
            <Button
              bgcolor="bg-white"
              border="border-3 border-yellow-800"
              textColor="text-yellow-800"
              name="Open"
              hover="hover:bg-gray-200"
            />
          </div>

          <div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-lg font-semibold text-[#035d67] mb-4">
              Add New Category
            </h2>
            <Button
              bgcolor="bg-white"
              border="border-3 border-yellow-800"
              textColor="text-yellow-800"
              name="Open"
              hover="hover:bg-gray-200"
            />
          </div>

          <div className="p-4 bg-white rounded-2xl shadow hover:shadow-lg transition cursor-pointer">
            <h2 className="text-lg font-semibold text-[#035d67] mb-4">
              Add New Category
            </h2>
            <Button
              bgcolor="bg-white"
              border="border-3 border-yellow-800"
              textColor="text-yellow-800"
              name="Open"
              hover="hover:bg-gray-200"
            />
          </div>
        </div>
      </div>
      
    </div>
  );
}
