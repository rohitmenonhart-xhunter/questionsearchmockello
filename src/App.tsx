import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { QuestionCard } from './components/QuestionCard';
import { questions } from './data/questions';
import { Question } from './types/question';

function App() {
  const [searchId, setSearchId] = useState('');
  const [question, setQuestion] = useState<Question | null>(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    const found = questions.find(q => q.id.toLowerCase() === searchId.toLowerCase());
    if (found) {
      setQuestion(found);
      setError('');
    } else {
      setQuestion(null);
      setError('No question found with this ID');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Question Search</h1>
          <p className="text-muted-foreground">
            Enter a question ID to view its details
          </p>
        </div>

        <div className="flex space-x-2">
          <Input
            placeholder="Enter question ID (e.g., g-q1)"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="bg-card"
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button onClick={handleSearch}>
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>

        {error && (
          <div className="p-4 bg-destructive/10 text-destructive rounded-md text-center">
            {error}
          </div>
        )}

        {question && <QuestionCard question={question} />}
      </div>
    </div>
  );
}

export default App;