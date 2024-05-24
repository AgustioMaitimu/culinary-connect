'use client';

import React, { useState } from 'react';

export default function Create() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState(['']);
  const [steps, setSteps] = useState(['']);
  const [submitting, setSubmitting] = useState(false);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const handleAddStep = () => {
    setSteps([...steps, '']);
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const handleStepChange = (index, value) => {
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSubmitting(true);

    const body = {
      name,
      description,
      ingredients,
      steps,
    };

    const response = await fetch('/api/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      console.log('Recipe submitted successfully');
      location.reload();
    } else {
      console.error('Failed to submit recipe');
    }
  };

  return (
    <div className="mx-auto max-w-4xl rounded-lg bg-yellow-50 p-5">
      {submitting && <div className="fixed inset-0 bg-black opacity-50"></div>}
      <h1 className="mb-6 text-center text-3xl font-bold text-orange-600">
        Input Your Recipe
      </h1>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Recipe Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-lg border border-orange-300 bg-orange-100 p-3 focus:outline-none"
        />
        <input
          type="text"
          placeholder="Recipe Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="rounded-lg border border-orange-300 bg-orange-100 p-3 focus:outline-none"
        />

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-orange-700">Ingredients</h2>
          {ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              placeholder={`Ingredient ${index + 1}`}
              className="rounded-lg border border-orange-300 bg-orange-100 p-3 focus:outline-none"
            />
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="mt-2 rounded-lg bg-orange-400 px-4 py-2 font-bold text-white hover:bg-orange-500"
          >
            Add Ingredient
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold text-orange-700">Steps</h2>
          {steps.map((step, index) => (
            <textarea
              key={index}
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              placeholder={`Step ${index + 1}`}
              className="rounded-lg border border-orange-300 bg-orange-100 p-3 focus:outline-none"
            />
          ))}
          <button
            type="button"
            onClick={handleAddStep}
            className="mt-2 rounded-lg bg-orange-400 px-4 py-2 font-bold text-white hover:bg-orange-500"
          >
            Add Step
          </button>
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-4 rounded-lg bg-green-500 px-6 py-3 font-bold text-white hover:bg-green-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
