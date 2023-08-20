import { ReactNode } from "react";
// defining the Props
export type CrumbItem = {
    label: ReactNode; // e.g., Python
    path: string; // e.g., /development/programming-languages/python
};
export type BreadcrumbsProps = {
    crumbs: CrumbItem[];
};
import Link from "next/link";

import Breadcrumb from 'react-bootstrap/Breadcrumb';

const MyBreadcrumb = ({ crumbs }: BreadcrumbsProps) => {
    return (
        <div className="flex gap-2 crumbs-start">
            {crumbs.map((crumb, i) => {
                const isLastItem = i === crumbs.length - 1;
                if (!isLastItem) {
                    return (
                        <>
                            <Link
                                href={crumb.path}
                                key={i}
                            // className="text-indigo-500 hover:text-indigo-400 hover:underline"
                            >
                                {crumb.label}
                            </Link>
                            {/* separator */}
                            <span> / </span>
                        </>
                    );
                } else {
                    return crumb.label;
                }
            })}
        </div>
    );
};

export default MyBreadcrumb;