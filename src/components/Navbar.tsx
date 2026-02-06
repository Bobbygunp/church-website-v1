import Link from "next/link";
import Image from 'next/image';

export default function Navbar() {
    return (
        <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <span className="self-center text-2xl font-semibold whitespace-nowrap text-slate-800">
                            {/* <div className="relative w-12 h-12">
                                <Image 
                                    src="/logo.jpeg" 
                                    alt="Telugu Christian Fellowship Logo"
                                    width={150}     // Desired width in pixels
                                    height={50}     // Desired height in pixels
                                    priority        // Loads the image immediately (good for logos above the fold)
                                />
                            </div> */}
                            <Image 
                                src="/logo.jpeg" 
                                alt="Telugu Christian Fellowship Logo"
                                width={48}     // Desired width in pixels
                                height={48}     // Desired height in pixels
                                priority        // Loads the image immediately (good for logos above the fold)
                            />
                        </span>
                    </Link>
                    <div className="flex flex-col leading-tight font-bold text-sm tracking-wide text-[#5c3a3a]">
                        <span>Telugu</span>
                        <span>Christian</span>
                        <span>Fellowship</span>
                    </div>
                </div>

                <div className="text-center">
                    <h1 className="text-3xl md:text-5xl font-bold text-[#5c3a3a]">
                        తెలుగు క్రైస్తవ సహవాసము
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <Image
                        src="/logo.jpeg"
                        alt="Telugu Christian Fellowship Logo"
                        width={48}     // Desired width in pixels
                        height={48}     // Desired height in pixels
                        priority        // Loads the image immediately (good for logos above the fold)
                    />
                    </Link>

                    <div className="flex flex-col leading-snug font-bold text-sm tracking-wide text-[#5c3a3a]">
                        <span>తెలుగు</span>
                        <span>క్రైస్తవ</span>
                        <span>సహవాసము</span>
                    </div>
                </div>

                <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                        <li>
                            {/* <Link href="/" className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0" aria-current="page"> */}
                            <Link href="/" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/events" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">
                                Events
                            </Link>
                        </li>
                        <li>
                            {/* "Give" button usually stands out */}
                            <Link href="/give" className="block py-2 px-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 md:px-5 md:py-1 transition-colors">
                                Give
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <div
                className="w-full h-4 mt-2"
                style={{
                    background: "repeating-linear-gradient(90deg, #0033cc 0px, #0033cc 20px, #ffcc00 20px, #ffcc00 40px)"
                }}
            ></div>

            <div className="w-full bg-white py-2">
                <p className="text-center text-[#8b5e5e] italic text-xs md:text-sm px-2">
                    Reaching the unreached, worshiping the LORD and passing on Telugu Christian culture and traditions to the next generations
                </p>
            </div>

            <div
                className="w-full h-4"
                style={{
                    background: "repeating-linear-gradient(90deg, #0033cc 0px, #0033cc 20px, #ffcc00 20px, #ffcc00 40px)"
                }}
            ></div>
            
        </nav>
    );
}