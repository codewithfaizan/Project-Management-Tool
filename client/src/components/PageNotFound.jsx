import React from 'react';

const PageNotFound = () => {
    return (
        // <!-- Error Container -->
        <div class="container basis-full mx-auto flex flex-col items-center justify-center p-8">
            <div class="text-orange-500 font-bold text-7xl">
                404
            </div>

            <div class="font-bold text-2xl xl:text-7xl lg:text-4xl md:text-3xl mt-10">
                This page does not exist
            </div>

            <div class="text-gray-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
                The page you are looking for could not be found.
            </div>
        </div>
    );
}

export default PageNotFound;
