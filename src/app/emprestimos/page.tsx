"use client"
import Header from "@/components/layout/header";
import Table from "@/components/emprestimos/table";

export default function Page(){
    return(
        <div className="flex">
            <Header/>
            <Table/>
        </div>
    )
}