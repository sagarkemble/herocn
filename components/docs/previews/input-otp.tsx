import type * as React from "react";
import Ex_input_otp_demo from "@/components/docs/examples/input-otp-demo";
import Ex_input_otp_variants from "@/components/docs/examples/input-otp-variants";
import Ex_input_otp_separator from "@/components/docs/examples/input-otp-separator";
import Ex_input_otp_disabled from "@/components/docs/examples/input-otp-disabled";
import Ex_input_otp_controlled from "@/components/docs/examples/input-otp-controlled";
import Ex_input_otp_invalid from "@/components/docs/examples/input-otp-invalid";
import Ex_input_otp_four_digits from "@/components/docs/examples/input-otp-four-digits";
import Ex_input_otp_alphanumeric from "@/components/docs/examples/input-otp-alphanumeric";
import Ex_input_otp_in_surface from "@/components/docs/examples/input-otp-in-surface";
import Ex_input_otp_form from "@/components/docs/examples/input-otp-form";

export const previews: Record<string, React.ComponentType> = {
  "input-otp-demo": Ex_input_otp_demo,
  "input-otp-variants": Ex_input_otp_variants,
  "input-otp-separator": Ex_input_otp_separator,
  "input-otp-disabled": Ex_input_otp_disabled,
  "input-otp-controlled": Ex_input_otp_controlled,
  "input-otp-invalid": Ex_input_otp_invalid,
  "input-otp-four-digits": Ex_input_otp_four_digits,
  "input-otp-alphanumeric": Ex_input_otp_alphanumeric,
  "input-otp-in-surface": Ex_input_otp_in_surface,
  "input-otp-form": Ex_input_otp_form,
};
