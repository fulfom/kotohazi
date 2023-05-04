import { useRouter } from 'next/router';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

type Crumbs = {
    href: string;
    text: string;
}
function MyBreadcrumb(props: { crumbs?: Crumbs[] }) {
    const router = useRouter();
    const generateBreadcrumbs = () => {
        if (props.crumbs) {
            return props.crumbs;
        }
        // Remove any query parameters, as those aren't included in breadcrumbs
        const asPathWithoutQuery = router.asPath.split("?")[0];

        // Break down the path between "/"s, removing empty entities
        // Ex:"/my/nested/path" --> ["my", "nested", "path"]
        const asPathNestedRoutes = asPathWithoutQuery.split("/")
            .filter(v => v.length > 0);

        // Iterate over the list of nested route parts and build
        // a "crumb" object for each one.
        const crumblist = asPathNestedRoutes.map((subpath, idx) => {
            // We can get the partial nested route for the crumb
            // by joining together the path parts up to this point.
            const href = "/" + asPathNestedRoutes.slice(0, idx + 1).join("/");
            // The title will just be the route string for now
            const text = "" + asPathNestedRoutes.slice(0, idx + 1).join(" ");
            return { href, text };
        })

        // Add in a default "Home" crumb for the top-level
        return [{ href: "/", text: "Home" }, ...crumblist];
    }

    return (
        <Breadcrumb>
            {generateBreadcrumbs().map(({ href, text }) => (
                <Breadcrumb.Item href={href} key={text}>{text}</Breadcrumb.Item>
            ))}
        </Breadcrumb>
    );
}

export default MyBreadcrumb;