import Image from 'next/image';
import React from 'react';
import { MainLayout } from "../../components/layouts"
// import { FaTrashAlt } from 'react-icons/fa';
// import { PrimaryButton } from '../components/button';
// import Link from 'next/link';
// import { BsArrowLeft } from 'react-icons/bs';

const RecapPage = () => {
    return (
        <MainLayout title="My Recap">
            <section className="py-8">
                <div className="flex items-center justify-between border-b border-gray-300 pb-6">
                    <h3>Sales Recap</h3>
                </div>
                <br/>
             <div className="rounded-lg shadow">
                <table className="w-full ">
                <thead className="bg-black border-b-3  border-gray-200 text-white">
                    <tr>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">Product</th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Prices</th>
                    <th className="w-24 p-3 text-sm font-semibold tracking-wide text-left">Sales</th>
                    <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white">
                    <td className="p-3 text-sm text-gray-700">Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops</td>
                    <td className="p-3 text-sm text-gray-700" >$200</td>
                    <td className="p-3 text-sm text-gray-700">1</td>
                    <td className="p-3 text-sm text-gray-700 text-left">$200</td>
                </tr>
                    <tr className="bg-gray-200" >
                    <td className="p-3 text-sm text-gray-700">Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops</td>
                    <td className="p-3 text-sm text-gray-700">$200</td>
                    <td className="p-3 text-sm text-gray-700">1</td>
                    <td className="p-3 text-sm text-gray-700">$200</td>
                </tr>
                    <tr className="bg-white">
                    <td className="p-3 text-sm text-gray-700">Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptopsr</td>
                    <td className="p-3 text-sm text-gray-700">$200</td>
                    <td className="p-3 text-sm text-gray-700">1</td>
                    <td className="p-3 text-sm text-gray-700">$200</td>
                </tr>
                    <tr className="bg-gray-200">
                    <td className="p-3 text-sm text-gray-700">Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptopsr</td>
                    <td className="p-3 text-sm text-gray-700">$200</td>
                    <td className="p-3 text-sm text-gray-700">1</td>
                    <td className="p-3 text-sm text-gray-700">$200</td>
                </tr>
                <tr className="bg-white">
                    <td className="p-3 text-sm text-gray-700">Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptopsr</td>
                    <td className="p-3 text-sm text-gray-700">$200</td>
                    <td className="p-3 text-sm text-gray-700">1</td>
                    <td className="p-3 text-sm text-gray-700">$200</td>
                </tr>
                <tr className="bg-gray-200">
                    <td className="p-3 text-sm text-gray-700">Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptopsr</td>
                    <td className="p-3 text-sm text-gray-700">$200</td>
                    <td className="p-3 text-sm text-gray-700">1</td>
                    <td className="p-3 text-sm text-gray-700">$200</td>
                </tr>
                </tbody>
                </table>
                </div>
                 <div className="pb-2 py-4">
                 <td className="p-3 font-bold text-sm text-gray-700">Total Revenue : </td>
                 <td className="p-3 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">$200</td> 
                 </div>
               </section>
              </MainLayout>
            )
        }

export default RecapPage;