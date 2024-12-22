<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PersonController extends Controller
{
    public function index()
    {
        $people = Person::with('subordinates')->whereNull('parent_id')->get(); // Root-level people (e.g., John)
        return response()->json($people);
    }

    public function show($id)
    {
        $person = Person::with('subordinates')->findOrFail($id);
        return response()->json($person);
    }

    public function store(Request $request)
    {
        $person = Person::create($request->all());
        return response()->json($person, 201);
    }

    public function update(Request $request, $id)
    {
        $person = Person::findOrFail($id);
        $person->update($request->all());
        return response()->json($person);
    }

    public function destroy($id)
    {
        $person = Person::findOrFail($id);
        $person->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}

