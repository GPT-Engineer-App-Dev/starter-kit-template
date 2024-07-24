import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const colorOptions = [
  { value: 'bg-yellow-200', label: 'Yellow' },
  { value: 'bg-green-200', label: 'Green' },
  { value: 'bg-blue-200', label: 'Blue' },
  { value: 'bg-red-200', label: 'Red' },
  { value: 'bg-purple-200', label: 'Purple' },
];

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [color, setColor] = useState(colorOptions[0].value);

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (title.trim() && content.trim()) {
      const newNote = {
        id: Date.now(),
        title,
        content,
        color,
        date: new Date().toISOString().split('T')[0],
      };
      setNotes([...notes, newNote]);
      setTitle('');
      setContent('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const getChartData = () => {
    const data = {};
    notes.forEach(note => {
      if (data[note.date]) {
        data[note.date]++;
      } else {
        data[note.date] = 1;
      }
    });
    return Object.entries(data).map(([date, count]) => ({ date, count }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4">
        <h1 className="text-2xl font-bold">Notes Taking App</h1>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Add a New Note</h2>
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                {colorOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={addNote}>Add Note</Button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {notes.map((note) => (
              <div key={note.id} className={`p-4 rounded-lg ${note.color}`}>
                <h3 className="font-semibold">{note.title}</h3>
                <p className="mt-2">{note.content}</p>
                <Button variant="destructive" size="sm" className="mt-4" onClick={() => deleteNote(note.id)}>
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Notes Created Per Day</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>

      <footer className="bg-gray-200 p-4 text-center">
        <p>&copy; 2023 Notes Taking App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Index;