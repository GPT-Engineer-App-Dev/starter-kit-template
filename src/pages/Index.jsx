import React from 'react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">My Application</h1>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Welcome to My Application</h2>
        <p className="mb-4">This is a bare-bones application that you can modify and build upon.</p>
        <Button>Click me</Button>
      </main>

      <footer className="bg-gray-200 p-4 text-center">
        <p>&copy; 2023 My Application. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;