from odoo import models


class ThemeRedeem(models.AbstractModel):
    _inherit = 'theme.utils'

    def _theme_redeem_post_copy(self, mod):

        self.enable_view('website.template_footer_descriptive')

        self.enable_view('website.template_header_default_align_center')

        self.disable_view('website.header_text_element')
        self.disable_view('website.header_search_box')
        self.disable_view('portal.user_sign_in')
        self.disable_view('portal.footer_language_selector')
