<?php

namespace App\Http\Controllers\AdminPsdm;

use App\Http\Controllers\Controller;
use App\Models\Recruitment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use League\Csv\Writer;
use SplTempFileObject;

class RecruitmentController extends Controller
{
    public function index()
    {
        return Inertia::render('admin-psdm/recruitment/index', [
            'recruitments' => Recruitment::withCount('registrants')->latest()->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('admin-psdm/recruitment/create');
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title'               => 'required|string|max:255',
            'description'         => 'nullable|string',
            'registration_fields' => 'required|array|min:1',
            'registration_fields.*.name'     => 'required|string',
            'registration_fields.*.type'     => 'required|string|in:text,number,email,textarea,select,radio,checkbox',
            'registration_fields.*.required' => 'required|boolean',
            'registration_fields.*.options'  => 'nullable|array',
            'max_registrants'     => 'nullable|integer|min:1',
            'starts_at'           => 'nullable|date',
            'ends_at'             => 'nullable|date|after_or_equal:starts_at',
        ]);

        Recruitment::create($data);

        return redirect()
            ->route('admin-psdm.recruitment.index')
            ->with('success', 'Rekrutmen berhasil dibuat.');
    }

    public function edit(Recruitment $recruitment)
    {
        return Inertia::render('admin-psdm/recruitment/edit', [
            'recruitment' => $recruitment,
        ]);
    }

    public function update(Request $request, Recruitment $recruitment)
    {
        $data = $request->validate([
            'title'               => 'required|string|max:255',
            'description'         => 'nullable|string',
            'registration_fields' => 'required|array|min:1',
            'registration_fields.*.name'     => 'required|string',
            'registration_fields.*.type'     => 'required|string|in:text,number,email,textarea,select,radio,checkbox',
            'registration_fields.*.required' => 'required|boolean',
            'registration_fields.*.options'  => 'nullable|array',
            'max_registrants'     => 'nullable|integer|min:1',
            'starts_at'           => 'nullable|date',
            'ends_at'             => 'nullable|date|after_or_equal:starts_at',
        ]);

        $recruitment->update($data);

        return redirect()
            ->route('admin-psdm.recruitment.index')
            ->with('success', 'Rekrutmen berhasil diperbarui.');
    }

    public function destroy(Recruitment $recruitment)
    {
        $recruitment->delete();

        return back()->with('success', 'Rekrutmen berhasil dihapus.');
    }

    /**
     * Toggle the is_active status.
     */
    public function toggle(Recruitment $recruitment)
    {
        $recruitment->update(['is_active' => ! $recruitment->is_active]);

        $status = $recruitment->is_active ? 'diaktifkan' : 'dinonaktifkan';

        return back()->with('success', "Rekrutmen berhasil {$status}.");
    }

    /**
     * Show list of registrants for a specific recruitment.
     */
    public function registrants(Recruitment $recruitment)
    {
        $registrants = $recruitment->registrants()->latest()->paginate(20);

        return Inertia::render('admin-psdm/recruitment/registrants', [
            'recruitment' => $recruitment,
            'registrants' => $registrants,
        ]);
    }

    /**
     * Export registrants to CSV.
     */
    public function exportRegistrants(Recruitment $recruitment)
    {
        $registrants = $recruitment->registrants()->latest()->get();
        $fields = $recruitment->registration_fields ?? [];

        $headers = collect($fields)->pluck('name')->toArray();
        array_unshift($headers, 'No', 'Tanggal Daftar');

        $csv = Writer::createFromFileObject(new SplTempFileObject());
        $csv->insertOne($headers);

        foreach ($registrants as $index => $registrant) {
            $data = $registrant->registration_data;
            $row = [
                $index + 1,
                $registrant->created_at->format('Y-m-d H:i:s'),
            ];

            foreach ($fields as $field) {
                $fieldName = str_replace(' ', '_', strtolower($field['name']));
                $row[] = $data[$fieldName] ?? '-';
            }

            $csv->insertOne($row);
        }

        $filename = 'Pendaftar-' . str_replace(' ', '-', $recruitment->title) . '-' . date('YmdHis') . '.csv';

        return response((string) $csv, 200, [
            'Content-Type'        => 'text/csv',
            'Content-Disposition' => 'attachment; filename="' . $filename . '"',
        ]);
    }
}
