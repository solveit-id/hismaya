"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import type { IconType } from "react-icons";

import { FaAward, FaBriefcase } from "react-icons/fa";

import {
    FiChevronDown,
    FiRefreshCw,
    FiSearch,
} from "react-icons/fi";

import CertificationCard from "./certification-card";

import {
    certificationTypes,
    certifications,
    internationalCertificationFields,
    nationalCertificationFields,
    type CertificationType,
} from "../data/certification-data";

type CertificationFilteredGridProps = {
    limit?: number;
};

type FilterDropdownProps = {
    label: string;
    value: string;
    placeholder: string;
    options: string[];
    icon: IconType;
    disabled?: boolean;
    onChange: (value: string) => void;
};

function FilterDropdown({
    label,
    value,
    placeholder,
    options,
    icon: Icon,
    disabled = false,
    onChange,
}: FilterDropdownProps) {
    const [open, setOpen] = useState(false);
    
    const selectedLabel = value || placeholder;
    
    return (
        <div className="relative w-full max-w-[300px] sm:w-[260px]">
            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen((current) => !current)}
                onBlur={() => {
                window.setTimeout(() => setOpen(false), 120);
                }}
                className="flex h-[54px] w-full items-center justify-between gap-3 rounded-xl bg-[#078fd3] px-5 text-left text-white shadow-[0_10px_22px_rgba(7,143,211,0.22)] transition hover:bg-[#067fbb] disabled:cursor-not-allowed disabled:opacity-60"
            >
                <span className="flex min-w-0 items-center gap-3">
                    <Icon className="h-4 w-4 shrink-0 text-white" />

                    <span className="min-w-0">
                        <span className="block text-[10px] font-extrabold uppercase tracking-[0.08em] text-white">
                            {label}
                        </span>

                        <span className="mt-1 block truncate text-[13px] font-bold text-white">
                            {selectedLabel}
                        </span>
                    </span>
                </span>
                
                <FiChevronDown
                    className={`h-4 w-4 shrink-0 text-white transition ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>

            {open && !disabled ? (
                <div className="absolute left-0 top-[calc(100%+10px)] z-40 w-full overflow-hidden rounded-xl border border-black/5 bg-white py-2 shadow-[0_18px_36px_rgba(0,0,0,0.16)]">
                    {options.map((option) => (
                        <button
                            key={option}
                            type="button"
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => {
                                onChange(option);
                                setOpen(false);
                            }}
                            className={`block w-full px-4 py-3 text-left text-[13px] font-semibold leading-snug transition hover:bg-[#eaf7fd] ${
                                value === option
                                ? "bg-[#eaf7fd] text-[#078fd3]"
                                : "text-[#555]"
                            }`}
                            >
                            {option}
                        </button>
                    ))}
                </div>
            ) : null}
        </div>
    );
}

export default function CertificationFilteredGrid({
    limit,
}: CertificationFilteredGridProps) {

    const searchParams = useSearchParams();

    // STATE
    const [selectedType, setSelectedType] =
        useState<CertificationType | "">("");
        
        const [selectedField, setSelectedField] =
            useState("");
            
            const [selectedDuration, setSelectedDuration] =
                useState("");

                // AMBIL QUERY PARAMS DARI HERO
                useEffect(() => {
                    const category =
                    (searchParams.get("category") as CertificationType) || "";

                    const Sector =
                    searchParams.get("Sector") || "";

                    const duration =
                    searchParams.get("duration") || "";

                    setSelectedType(category);
                    setSelectedField(Sector);
                    setSelectedDuration(duration);

                }, [searchParams]);

                // CHECK ACTIVE FILTER
                const hasActiveFilter =
                    selectedType !== "" ||
                    selectedField !== "" ||
                    selectedDuration !== "";
                    
                    // FIELD OPTIONS BERDASARKAN TYPE
                    const fieldOptions = useMemo(() => {

                        if (selectedType === "Nasional") {
                        return nationalCertificationFields;
                        }

                        if (selectedType === "Internasional") {
                        return internationalCertificationFields;
                        }

                        return [];

                    }, [selectedType]);

                // FILTER DATA
                const filteredCertifications = useMemo(() => {

                    const filtered = certifications.filter((certification) => {

                    const typeMatches =
                        selectedType === "" ||
                        certification.type === selectedType;

                    const fieldMatches =
                        selectedField === "" ||
                        certification.field === selectedField;

                    const durationMatches =
                        selectedDuration === "" ||
                        certification.duration === selectedDuration;

                    return (
                        typeMatches &&
                        fieldMatches &&
                        durationMatches
                    );
                    });

                    return typeof limit === "number"
                    ? filtered.slice(0, limit)
                    : filtered;

                }, [
                    limit,
                    selectedField,
                    selectedType,
                    selectedDuration,
                ]);
                
                return (
                <>
                <div className="mt-14 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">

                    {/* CATEGORY */}
                    <FilterDropdown
                        label="Kategori"
                        value={selectedType}
                        placeholder="Semua Kategori"
                        options={[...certificationTypes]}
                        icon={FaAward}
                        onChange={(value) => {

                            setSelectedType(value as CertificationType | "");

                            // RESET FIELD SAAT TYPE BERUBAH
                            setSelectedField("");
                        }}
                    />

                    {/* FIELD */}
                    <FilterDropdown
                        label="Bidang"
                        value={selectedField}
                        placeholder={
                            selectedType
                            ? "Semua Bidang"
                            : "Pilih Kategori"
                        }
                        options={fieldOptions}
                        icon={FaBriefcase}
                        disabled={!selectedType}
                        onChange={setSelectedField}
                    />

                    {/* DURATION */}
                    <FilterDropdown
                        label="Durasi"
                        value={selectedDuration}
                        placeholder="Semua Durasi"
                        options={[
                            "1 Hari",
                            "2 Hari",
                            "3 Hari",
                            "4 Hari",
                            "5 Hari",
                            "1 Minggu",
                            "2 Minggu",
                        ]}
                        icon={FiSearch}
                        onChange={setSelectedDuration}
                    />

                    {/* RESET BUTTON */}
                    <button
                        type="button"
                        onClick={() => {

                            if (hasActiveFilter) {
                            setSelectedType("");
                            setSelectedField("");
                            setSelectedDuration("");
                            }

                        }}
                        className="flex h-[54px] w-full max-w-[150px] items-center justify-center gap-2 rounded-xl bg-[#078fd3] px-6 text-[14px] font-extrabold text-white shadow-[0_10px_22px_rgba(7,143,211,0.22)] transition hover:bg-[#067fbb] sm:w-auto"
                    >
                        {hasActiveFilter ? (
                            <>
                            <FiRefreshCw className="h-4 w-4" />
                            <span>Reset</span>
                            </>
                        ) : (
                            <>
                            <FiSearch className="h-4 w-4" />
                            <span>Temukan</span>
                            </>
                        )}
                    </button>
                </div>

                {/* GRID */}
                <div className="mt-[72px] grid gap-x-[78px] gap-y-[64px] sm:grid-cols-2 lg:grid-cols-3">

                    {filteredCertifications.map((certification) => (
                        <CertificationCard
                            key={certification.id}
                            certification={certification}
                        />
                    ))}

                </div>

                {/* EMPTY */}
                {filteredCertifications.length === 0 ? (
                    <p className="mt-12 text-center text-[15px] font-semibold text-[#747474]">
                    Sertifikasi tidak ditemukan untuk filter yang dipilih.
                    </p>
                ) : null}
                </>
  );
}