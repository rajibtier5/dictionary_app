import React, { Children, FC, ReactElement, ReactNode } from "react";

type SafelyRenderChildrenProps = {
	children: ReactNode;
};

const SafelyRenderChildren: FC<SafelyRenderChildrenProps> = ({ children }) => {
	const count = Children.count(children);
	if (count > 5000) {
		return <span>You're attempting to render too many children</span>;
	}

	return <>{children}</>;
};

export default SafelyRenderChildren;
